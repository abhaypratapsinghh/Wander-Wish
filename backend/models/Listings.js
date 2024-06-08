const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const ListingSchema = new mongoose.Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  category: {
    type: [Schema.Types.String],
    required: true,
  },
  types: {
    type:[String],
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  amenity: {
    type:[String],
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: {
    type: String,
    required: true,
  },
  highlightDetails: {
    type: String,
    required: true,
  },
  listingPhotoPaths: [{ type: String }],
  price: {
    type: Number,
    required: true,
  }
});

const Listing = mongoose.model("Listing", ListingSchema);
    
module.exports = Listing;