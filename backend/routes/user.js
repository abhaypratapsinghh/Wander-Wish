const router = require("express").Router();

const Bookings = require("../models/Booking");
const Listings = require("../models/Listings");
const User = require("../models/User");

router.get("/:userId/trip-list", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Bookings.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json({
      message: "trips retrieved successfully",
      trips,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "cannot retrieve trips",
      err,
    });
  }
});
router.get("/:userId/reservation-list", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Bookings.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json({
      message: "reservations retrieved successfully",
      reservations,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "cannot retrieve reservations",
      err,
    });
  }
});
router.get("/:userId/reservation-list", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Bookings.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json({
      message: "reservations retrieved successfully",
      reservations,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "cannot retrieve reservations",
      err,
    });
  }
});
router.get("/:userId/property-list", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listings.find({ creator: userId });
    res.status(200).json({
      message: "properties retrieved successfully",
      properties,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "cannot retrieve properties",
      err,
    });
  }
});

router.patch("/:userId/:listingId/wish-list", async (req, res) => {
  const { userId, listingId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const listing = await Listings.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // let update;
    const likedListing = user.wishList.find(
      (item) => item?._id.toString() === listingId
    );

    if (likedListing) {
      // Remove listing from wish-list

      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
    } else {
      user.wishList = [...user.wishList, listing];
      await user.save();
    }

    const message = likedListing
      ? "Listing is removed from wish-list"
      : "Listing is added to wish list";

    res.status(200).json({
      message: message,
      wishList: user.wishList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while updating the wish list",
    });
  }
});

module.exports = router;
