
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyList } from "../../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const PropertyListPage = () => {
const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const propertyList = useSelector((state) => state.user.propertyList);
  const dispatch = useDispatch();

  const getAllProperties = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/users/${userId}/property-list`,
      });
      if (response) {
        // console.log(response.data.properties);
        dispatch(setPropertyList(response.data.properties));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    getAllProperties();
  }, []);
  
    console.log(propertyList);

  return loading ? (
    <div className="flex justify-center">
      <Loader />
    </div>
  ) : (
    <div className="font-serif min-h-screen">
      <Navbar />
      <div className="m-4 bg-gray-300 rounded-md p-4 minh-screen">
        <h1 className="text-4xl font-semibold ">Your Property List</h1>
        <div className="flex flex-wrap justify-evenly">
          {propertyList?.map((listing, index) => (
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
      </div>
      <div class="sticky top-[100vh]">
        <Footer />
      </div>
    </div>
  );
}

export default PropertyListPage;