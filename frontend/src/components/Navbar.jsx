import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/property-color-icon.svg";
import person from "../assets/man-user-circle-icon.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/state";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search/${search}`)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="bg-gray-200 mx-2 h-16 flex items-center justify-between">
        <img
          className="h-14 hover:cursor-pointer"
          src={logo}
          onClick={() => navigate("/")}
        ></img>
        <input
          className="mx-2 p-2 rounded-lg w-1/3"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleKeypress}
        ></input>
        <div className="flex items-center mx-2">
          {user ? (
            <a className="mx-2 text-lg" href="/create-listing">
              Become a host
            </a>
          ) : (
            <a className="mx-2 text-lg" href="/login">
              Become a host
            </a>
          )}
          <div className="flex flex-col justify-center items-center">
            <button
              className="mr-8 flex items-center"
              onClick={() => {
                setDropDown(!dropDown);
              }}
            >
              <img className="h-8" src={person}></img>
            </button>
          </div>
        </div>
      </div>
      {dropDown && !user && (
        <div
          ref={dropdownRef}
          className="text-lg flex flex-col items-center w-32 border-2 rounded-lg bg-white fixed right-2 top-12"
        >
          <Link to="/login"> Log in</Link>
          <Link to="/register"> Register</Link>
        </div>
      )}
      {dropDown && user && (
        <div
          ref={dropdownRef}
          className="flex flex-col items-center w-32 border-2 rounded-lg bg-white fixed right-2 top-12"
        >
          <Link to={`/${customerId}/trip-list`}>Trip List</Link>
          <Link to={`/${customerId}/wish-list`}>Wish List</Link>
          <Link to={`/${customerId}/property-list`}>Property List</Link>
          <Link to={`/${customerId}/reservation-list`}>Reservation List</Link>
          <Link to="/login" onClick={() => dispatch(setLogout())}>
            Log out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
