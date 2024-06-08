const router = require('express').Router();

const Booking = require("../models/Booking");

router.post("/create", async (req, res) => { 
    try {
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;
        const newBooking = new Booking({
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice
        });

        await newBooking.save();

        res.status(200).json({
            message: "Booking done successfully",
            booking: newBooking
        })
    }
    catch (err) { 
        res.status(404).json({
            message: "Booking error",
            error: err.message
        })
    }
})

module.exports = router;