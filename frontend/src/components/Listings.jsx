import React from "react";
import { categories } from "../data";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListing } from "../../redux/state";
import Loader from "./Loader";
import ListingCard from "./ListingCard";

const Listing = ({categoryType}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const initialCategory = categoryType ? categoryType : "All";
  console.log(initialCategory);
  const [selectCategory, setSelectCategory] = useState(initialCategory);
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/properties/?category=${
          selectCategory !== "All" ? selectCategory : ""
        }`,
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(setListing({ listings: response.data.listings }));
      setLoading(false);
    } catch (err) {
      console.log("fetching listing feed failed", err);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectCategory]);

  return (
    <div className="flex flex-col justify-center items-center my-6">
      <div className="grid grid-cols-8 gap-2 w-5/6 justify-evenly items-center my-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            className={`flex flex-col justify-center items-center p-2 m-4 hover:opacity-70 ${selectCategory==category.label?"text-red-500 ":""}`}
            onClick={(e) => setSelectCategory(category.label)}
          >
            <div>{category.icon}</div>
            <div className="">{category.label}</div>
          </Link>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className=" w-5/6 flex flex-wrap justify-evenly">
          {listings.map((listing, index) => (
            <div className="flex justify-center items-center m-4" key={index}>
              <ListingCard
                listingId={listing._id}
                creator={listing.creator}
                listingPhotoPaths={listing.listingPhotoPaths}
                city={listing.city}
                state={listing.state}
                country={listing.country}
                category={listing.category}
                type={listing.types}
                price={listing.price}
                home={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listing;
