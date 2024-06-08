import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripListPage = () => {
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const tripList = useSelector((state) => state.user.tripList);
  const dispatch = useDispatch();

  const getAllTrips = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/users/${userId}/trip-list`,
      });
      if (response) {
        dispatch(setTripList(response.data.trips));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(tripList);

  useEffect(() => {
    getAllTrips();
  }, []);

  return loading ? (
    <div className="flex justify-center">
      <Loader />
    </div>
  ) : (
    <div className="font-serif min-h-screen">
      <Navbar />
      <div className="m-4 bg-gray-300 rounded-md p-4 minh-screen">
        <h1 className="text-4xl font-semibold ">Your Trip List</h1>
        <div className="flex flex-wrap justify-evenly">
          {tripList?.map(
            ({ listingId, startDate, endDate, totalPrice, booking = true }) => (
              <ListingCard
                listingId={listingId}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                state={listingId.state}
                country={listingId.country}
                category={listingId.category}
                types={listingId.types}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={booking}
              />
            )
          )}
        </div>
      </div>
      <div class="sticky top-[100vh]">
      <Footer/>
      </div>
    </div>
  );
};

export default TripListPage;
