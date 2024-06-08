import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    return (
      <div className="flex flex-col justify-center items-center text-lg ">
        <h1 className="text-4xl font-bold p-5">Explore Top Categories</h1>
        <p className="w-11/12 p-2 text-justify mb-3">
          Welcome to Wander Wish, your go-to destination for luxurious
          beachfront stays. Discover serene oceanfront suites, family-friendly
          villas, and romantic hideaways, each offering unparalleled comfort and
          stunning views. Browse our top categories with ease, featuring private
          beach access, gourmet kitchens, and outdoor entertainment areas.
          Whether it's a peaceful retreat or a fun-filled vacation, we have the
          perfect accommodation for you. Book now to experience the ultimate
          coastal getaway
        </p>
        <div className="flex flex-wrap justify-evenly gap-4 w-5/6">
          {categories?.slice(1, 7).map((category, index) => (
            <Link
              key={index}
              className="flex flex-col justify-center items-center hover:opacity-90"
              to={`/property/category/${category.label}`}
            >
              <img
                className="w-80 h-60 hover:opacity-80"
                src={category.img}
                alt={category.label}
              />
              <div className="text-center">{category.label}</div>
            </Link>
          ))}
        </div>
      </div>
    );
}
export default Categories;