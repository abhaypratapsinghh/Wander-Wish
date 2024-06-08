import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchListing } from "../../redux/state";
import axios from "axios";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SearchPage = () => {
  const { search } = useParams();
  const [loading, setLoading] = useState(true);
  const listings = useSelector((state) => state.searchListing);

  const dispatch = useDispatch();

  const getSearchResults = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/properties/search/${search}`,
      });
      dispatch(setSearchListing(response.data));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSearchResults();
  }, [search]);

  console.log(listings);

  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="">
          <Navbar />
          <div className="m-4 bg-gray-300 rounded-lg p-4">
            <div className="font-serif text-2xl ">
              Search result for {`"${search} "`}
            </div>
            <div className="flex flex-wrap gap-2 justify-evenly">
              {listings.map((listing, index) => (
                <div
                  className="flex justify-center items-center m-4"
                  key={index}
                >
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
          </div>
        </div>
      )}
      <div class="sticky top-[100vh]">
       <Footer/>
      </div>
    </div>
  );
};

export default SearchPage;
