import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listing from "../components/Listings";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="font-serif min-h-screen">
      <Navbar />
      <Slide />
      <Categories />
      <Listing />
      <div class="sticky top-[100vh]">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
