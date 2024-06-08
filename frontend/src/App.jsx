import { useState } from "react";
import { BrowserRouter, Route , Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import TripListPage from "./pages/TripListPage";
import PropertyListPage from "./pages/PropertyListPage";
import WishListPage from "./pages/WishListPage";
import ReservationListPage from "./pages/ReservationListPage";
import CategoryPage from "./pages/CategoryPage"
import SearchPage from "./pages/SearchPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/create-listing" element={<CreateListingPage />}></Route>
        <Route
          path="/property/:listingId"
          element={<ListingDetailsPage />}
        ></Route>
        <Route path="/:userId/trip-list" element={<TripListPage />}></Route>
        <Route
          path="/:userId/property-list"
          element={<PropertyListPage />}
        ></Route>
        <Route path="/:userId/wish-list" element={<WishListPage />}></Route>
        <Route path="/:userId/reservation-list" element={<ReservationListPage />}></Route>
        <Route path="/property/category/:categoryType" element={<CategoryPage />}></Route>
        <Route path="/search/:search" element={<SearchPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
