import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const WishListPage = () => {
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const propertyList = useSelector((state) => state.user.wishList);
  console.log(propertyList.length);

  useEffect(() => {
    setLoading(propertyList.length === 0);
  });

  return (
    <div className="min-h-screen">
      {loading ? (
        <>
          <div className="">
            <Navbar />
            <div className="flex flex-col justify-center items-center">
              <Loader />
            </div>
          </div>
        </>
      ) : (
        <div className="font-serif">
          <Navbar />
          <div className="m-4 bg-gray-300 rounded-md p-4 minh-screen">
            <h1 className="text-4xl font-semibold ">Your Wish List</h1>
            <div className="flex flex-wrap justify-evenly">
              {propertyList?.map((listing, index) => (
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
        <Footer />
      </div>
    </div>
  );
};

export default WishListPage;
