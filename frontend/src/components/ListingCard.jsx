import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setWishList } from "../../redux/state";
import { MdFavorite } from "react-icons/md";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  state,
  country,
  category,
  types,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
  home,
}) => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const displayLength = listingPhotoPaths.length;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let wishList = null; 
  let isLiked = null; 

  if (user) {
    wishList = user.wishList;
    isLiked = wishList.find((item) => item?._id === listingId);
  }

  const handleWishList = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `http://localhost:3001/api/v1/users/${user._id}/${listingId}/wish-list`,
      });

      dispatch(setWishList(response.data.wishList));

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);
     
  
 
  // console.log(isLiked);

  return (
    <div className="">
      {home &&
        listingPhotoPaths?.map((photo, index) => {
          const imageUrl = `http://localhost:3001/${photo?.replace(
            "public",
            ""
          )}`;
          return (
            <div className={``} key={index}>
              <div
                className={`bg-slate-300 rounded-lg border py-2 ${
                  index !== displayIndex ? "hidden" : ""
                }`}
              >
                <div className="flex justify-center items-center my-2">
                  <button
                    onClick={() => {
                      setDisplayIndex(
                        (displayIndex - 1 + displayLength) % displayLength
                      );
                    }}
                  >
                    <MdNavigateBefore size={30} />
                  </button>
                  <Link
                    className="border bg-slate-200 rounded-2xl"
                    to={`/property/${listingId}`}
                  >
                    <img
                      className={`p-3 h-60 w-80 rounded-md `}
                      src={imageUrl}
                      alt={`photo${index + 1}`}
                    />
                  </Link>

                  <button
                    onClick={() => {
                      setDisplayIndex((displayIndex + 1) % displayLength);
                    }}
                  >
                    <MdNavigateNext size={30} />
                  </button>
                </div>
                <div className="ml-8 bg-slate-300 flex flex-col justify-start  items-start">
                  <h2 className="font-bold text-xs md:text-base">
                    {city} , {state}
                  </h2>
                  <h2 className="font-bold text-xs md:text-base">{country}</h2>
                  <h2 className="">${price} per night</h2>
                  <div
                    className="absolute ml-60 hover:cursor-pointer"
                    onClick={handleWishList}
                  >
                    {user && isLiked ? (
                      <MdFavorite size={30} color="red" />
                    ) : (
                      <MdFavorite size={30} color="white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {booking &&
        listingPhotoPaths.map((photo, index) => {
          const imageUrl = `http://localhost:3001/${photo?.replace(
            "public",
            ""
          )}`;
          return (
            <div className={``} key={index}>
              <div
                className={`text-center ${
                  index !== displayIndex ? "hidden" : ""
                }`}
              >
                <div className="m-2 flex justify-center items-center">
                  <button
                    onClick={() => {
                      setDisplayIndex(
                        (displayIndex - 1 + displayLength) % displayLength
                      );
                    }}
                  >
                    <MdNavigateBefore size={30} />
                  </button>

                  <Link
                    className="border bg-slate-200 rounded-2xl"
                    to={`/property/${listingId._id}`}
                  >
                    <img
                      className={`p-4 h-60 w-80 rounded-md `}
                      src={imageUrl}
                      alt={`photo${index + 1}`}
                    />
                    <h2 className="font-bold text-xl">
                      {city} , {state}
                    </h2>
                    <h2 className="font-bold text-xl ">{country}</h2>
                    <h2 className="text-lg my-2">
                      {startDate} - {endDate}
                    </h2>
                    <h2 className="text-lg">Total ${totalPrice}</h2>
                  </Link>

                  <button
                    onClick={() => {
                      setDisplayIndex((displayIndex + 1) % displayLength);
                    }}
                  >
                    <MdNavigateNext size={30} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListingCard;
