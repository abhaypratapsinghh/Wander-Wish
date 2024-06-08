import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const ListingDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  const getListingDetails = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/properties/${listingId}`,
      });

      setListing(response.data);
      const str = response.data.amenity[0];
      setAmenities(str.split(","));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getListingDetails();
  }, []);

  const customerId = useSelector((state) => state?.user?._id);

  const handleSubmit =async() => { 
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount
      }
      
      console.log(bookingForm);
      const request = await axios({
        method: 'POST',
        url: `http://localhost:3001/api/v1/bookings/create`,
        data:JSON.stringify(bookingForm),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (request) {
        navigate(`/${customerId}/trip-list`)
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {loading ? (
        <div className="flex flex-col justify-center items-center m-4 font-serif ">
          <Loader />
        </div>
      ) : (
        <div
          className="flex flex-col flex-wrap justify-center m-4 border rounded-md bg-gray-300 p-4
         font-serif"
        >
          <div>
            <h1 className="text-6xl font-bold my-4 ">{listing.title}</h1>
          </div>
          <div className=" flex flex-wrap gap-2 items-center justify-evenly">
            {listing.listingPhotoPaths?.map((photo, index) => {
              return (
                <div key={index}>
                  <img
                    className="w-80"
                    src={`http://localhost:3001/${photo?.replace(
                      "public",
                      ""
                    )}`}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <h1 className="text-2xl font-semibold my-4">
              {listing.types} in {listing.city} , {listing.state} ,{" "}
              {listing.country}
            </h1>
            <h1 className="text-xl my-4">
              {listing.guests} guests - {listing.beds} beds - {listing.bedrooms}
              bedrooms - {listing.bathrooms} bathrooms
            </h1>
            <hr />
            <div className="text-lg my-4">
              <h2 className="font-semibold">
                Owned by{" "}
                {`${
                  listing.creator.firstName + " " + listing.creator.lastName
                }`}
              </h2>
              <h3>{listing.creator.email}</h3>
            </div>
            <hr />
            <div>
              <h2 className="text-2xl font-black my-4">Description</h2>
              <p className="text-lg my-2">{listing.description}</p>
            </div>
            <hr />
            <h2 className="text-2xl font-black my-4">{listing.highlights}</h2>
            <p className="text-lg">{listing.highlightDetails}</p>
            <hr />
            <h2 className="text-3xl font-bold my-4">
              What this place offers ?
            </h2>
            <div className="flex">
              <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11">
                {amenities.map((item) => {
                  const f = facilities.find((facility) => {
                    return facility.name === item;
                  });
                  return (
                    f && (
                      <div
                        key={item}
                        className="flex flex-col items-center justify-center p-4 font-semibold text-base"
                      >
                        <div>{f.icon}</div>
                        <div>{f.name}</div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
          <hr />
          <h2 className="text-3xl font-bold my-4">
            How long do you want to stay ?
          </h2>
          <div className="text-xl font-semibold">
            <DateRange ranges={dateRange} onChange={handleSelect} />
            <div className="m-4">
              {dayCount > 1 ? (
                <h2>
                  ${listing.price}*${dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${listing.price}*${dayCount}night
                </h2>
              )}
              <h2>Total Price : ${listing.price * dayCount}</h2>
              <h2 className="my-2  text-base font-normal">
                Start Date : {dateRange[0].startDate.toDateString()}
              </h2>
              <h2 className="my-2 text-base font-normal">
                End Date : {dateRange[0].endDate.toDateString()}
              </h2>
              <button
                className="border px-4 py-2 rounded-lg bg-black text-white hover:bg-green-800"
                type="submit"
                onClick={handleSubmit}
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      )}
      <div class="sticky top-[100vh]">
        <Footer />
      </div>
    </div>
  );
};

export default ListingDetailsPage;
