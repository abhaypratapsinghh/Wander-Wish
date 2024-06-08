const express = require('express')
const router = express.Router()

const authRoutes = require("./auth");
const listingRoutes = require("./listing");
const bookingRoutes = require("./booking");
const userRoutes = require("./user");

router.use("/auth", authRoutes);
router.use("/properties", listingRoutes)
router.use("/bookings", bookingRoutes)
router.use("/users", userRoutes)

module.exports = router