
import React from "react";
import { useParams } from "react-router-dom";
import Listing from "../components/Listings";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CategoryPage = () => {
    const {categoryType}=useParams();
    return (
        <div className="minh-screen">
        <Navbar />
            <Listing categoryType={categoryType} />
            <Footer/>
        </div>
        
    )
}

export default CategoryPage;