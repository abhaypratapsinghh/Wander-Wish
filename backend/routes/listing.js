const router = require("express").Router();

const multer = require("multer");

const Listing = require("../models/Listings");
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      types,
      streetAddress,
      city,
      state,
      country,
      postalCode,
      amenity,
      guests,
      bedrooms,
      beds,
      bathrooms,
      title,
      description,
      highlights,
      highlightDetails,
      price,
    } = req.body;

    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(404).send("No listing photos");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);
    let cat = category.split(",");
    
    const newListing = new Listing({
      creator,
      category:cat,
      types,
      streetAddress,
      city,
      state,
      country,
      postalCode,
      amenity,
      guests,
      bedrooms,
      beds,
      bathrooms,
      title,
      description,
      highlights,
      highlightDetails,
      listingPhotoPaths,
      price,
    });


    await newListing.save();

    res.status(200).json({
      message: "Listing created successfully",
      newListing,
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      message:err.message,
    });
  }
});


router.get("/", async (req, res) => {
  try {
    const qparams = req.query.category;
    if (qparams) {
      const listings = await Listing.find({ category: { $in: [qparams] } });
     
      res.status(200).json({
           listings: listings
         })
    }
    else {
     
      const listings = await Listing.find();
      res.status(200).json({
        listings
      });
    }
    
  }
  catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Failed to create listing",
    })
    console.log(err.message);
  }
});


router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  }
  catch (err) {
    res.status(500).json({
      message: "Failed to retrive listing" + err.message
    });
  }
})


router.get("/search/:search", async (req, res) => { 
  const { search } = req.params;
  
  try {
    let listings = [];
    if (search == 'all') {
      listings = await Listing.find().populate("creator");
    }
    else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } }
        ]
      }).populate("creator");
    }

    res.status(200).json({
      listings:listings
    });
  }
  catch (err) {
    res.status(404).json({
      message: "listing search failed",
      err
    })
  }
})


module.exports = router;
