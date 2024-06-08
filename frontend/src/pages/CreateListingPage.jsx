import React from "react";
import Navbar from "../components/Navbar";
import { categories, allTypes, facilities } from "../data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { IoImages } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../components/Footer";

const CreateListing = () => {
  const navigate = useNavigate();
  const [categoryBg, setCategoryBg] = useState([]);
  const [typesBg, setTypesBg] = useState([]);
  const [amenitiesBg, setAmenitiesBg] = useState([]);
  const [photos, setPhotos] = useState([]);

  const [category, setCategory] = useState([]);
  const [types, setTypes] = useState([]);
  const [amenity, setAmenity] = useState([]);
  const [location, setLocation] = useState({
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  })
  const [guests, setGuests] = useState(0)
  const [bedrooms,setBedrooms] = useState(0)
  const [beds,setBeds] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [details, setDetails] = useState({
    title: "",
    description: "",
    highlights: "",
    highlightDetails: "",
  })
  const [price, setPrice] = useState(0);
  
  const creatorId = useSelector((state) => state.user._id);
  
  const handlePublish = async(e) => {
    e.preventDefault();
    const listingForm = new FormData();
    listingForm.append("creator",creatorId);
    listingForm.append("category", category);
    listingForm.append("types",types);
    listingForm.append("amenity",amenity);
    listingForm.append("streetAddress", location.streetAddress);
    listingForm.append( "city",location.city);
    listingForm.append("state",location.state);
    listingForm.append("country",location.country);
    listingForm.append("postalCode",location.postalCode);
    listingForm.append("guests",guests);
    listingForm.append("bedrooms",bedrooms);
    listingForm.append("beds",beds);
    listingForm.append("bathrooms",bathrooms);
    listingForm.append("title",details.title);
    listingForm.append("description",details.description);
    listingForm.append("highlights",details.highlights);
    listingForm.append("highlightDetails",details.highlightDetails);
    listingForm.append("price", price);

    photos.forEach((photo) => {
      listingForm.append("listingPhotos", photo);
    })


    const response = await axios({
      method: "post",
      url: "http://localhost:3001/api/v1/properties/create",
      data: listingForm,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response) {
      console.log("Listing created successfully:", response.data);
      navigate("/")
    }
    else {
     console.error("Error creating listing:", error);
    }
    
  }

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhotos = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhotos = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleAddBg = (indexToAdd, prevBg, cb) => { 
    const newBg = [...prevBg, indexToAdd];
    cb(newBg);
  }

  const handleRemoveBg = (indexToRemove, cb) => { 
    cb((prevBg) => prevBg.filter((ind) => ind != indexToRemove));
  }
  return (
    <>
      <Navbar />
      <div className=" font-serif p-8 bg-gray-100">
        <h1 className="text-3xl my-2 font-bold ">Publish Your Place</h1>
        <div className="my-5 bg-white rounded-md p-2">
          <h2 className="text-2xl my-2  text-red-700">
            Step 1: Tell us about your place
          </h2>
          <hr className="border-black border-1 drop-shadow-lg"></hr>
          <p className="text-xl mt-5">
            Which of these categories best describes your place?
          </p>
          <div className="grid sm:grid-cols-6 gap-4 m-4">
            {categories.map((cat, index) => (
              <label
                className={`flex flex-col justify-center items-center border rounded-md p-4 ${
                  categoryBg.includes(index) ? "bg-green-200" : ""
                }`}
                key={index}
                onClick={(e) => {
                  if (category.includes(cat.label)) {
                    setCategory((prevCat) =>
                      prevCat.filter((c) => c != cat.label)
                    );
                  } else {
                    setCategory((prevCat) => [...prevCat, cat.label]);
                  }
                  categoryBg.includes(index)
                    ? handleRemoveBg(index, setCategoryBg)
                    : handleAddBg(index, categoryBg, setCategoryBg);
                }}
              >
                <div>{cat.icon}</div>
                <p className="text-xs">{cat.label}</p>
              </label>
            ))}
          </div>
          <p className="text-xl mt-5">What type of place will guests have?</p>
          <div className="">
            {allTypes.slice(1).map((type, index) => (
              <div
                key={index}
                className={`flex justify-between border rounded-md p-5 my-2 text-md ${
                  typesBg.includes(index) ? "bg-green-200" : ""
                } `}
                onClick={() => {
                  if (types.includes(type.name)) {
                    setTypes((prevtypes) =>
                      prevtypes.filter((c) => c != type.name)
                    );
                  } else {
                    setTypes((prevtypes) => [...prevtypes, type.name]);
                  }
                  typesBg.includes(index)
                    ? handleRemoveBg(index, setTypesBg)
                    : handleAddBg(index, typesBg, setTypesBg);
                }}
              >
                <div>
                  <p>{type.name}</p>
                  <p>{type.description}</p>
                </div>
                <div>{type.icon}</div>
              </div>
            ))}
          </div>
          <p className="text-xl mt-5">Where's your place located?</p>
          <div className="my-1">
            <p>Street address</p>
            <textarea
              className="border p-2 w-full rounded-md"
              type="text"
              placeholder="Address"
              rows={1}
              onChange={(e) => {
                const newLocation = {
                  ...location,
                  streetAddress: e.target.value,
                };
                setLocation(newLocation);
              }}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p>City</p>
                <textarea
                  className="border p-2 w-full rounded-md"
                  type="text"
                  placeholder="City"
                  rows={1}
                  onChange={(e) => {
                    const newLocation = {
                      ...location,
                      city: e.target.value,
                    };
                    setLocation(newLocation);
                  }}
                />
              </div>
              <div>
                <p>State</p>
                <textarea
                  className="border p-2 w-full rounded-md"
                  type="text"
                  placeholder="State"
                  rows={1}
                  onChange={(e) => {
                    const newLocation = {
                      ...location,
                      state: e.target.value,
                    };
                    setLocation(newLocation);
                  }}
                />
              </div>
              <div>
                <p>Country</p>
                <textarea
                  className="border p-2 w-full rounded-md"
                  type="text"
                  placeholder="Country"
                  rows={1}
                  onChange={(e) => {
                    const newLocation = {
                      ...location,
                      country: e.target.value,
                    };
                    setLocation(newLocation);
                  }}
                />
              </div>
              <div>
                <p>Postal Code</p>
                <input
                  className="border p-2 w-full rounded-md"
                  type="number"
                  placeholder="Postal Code"
                  rows={1}
                  onChange={(e) => {
                    const newLocation = {
                      ...location,
                      postalCode: e.target.value,
                    };
                    setLocation(newLocation);
                  }}
                />
              </div>
            </div>
          </div>
          <p className="text-xl mt-5">
            Share some basics numbers about your place
          </p>
          <div className="mt-1 grid grid-cols-2 gap-4 border ">
            <div className="flex justify-evenly items-center">
              <p className="text-center">Guests :</p>
              <input
                className="m-1  border p-2"
                type="number"
                placeholder="Guests"
                onChange={(e) => setGuests(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-evenly items-center">
              <p className="text-center">Bedrooms :</p>
              <input
                className="m-1  border p-2"
                type="number"
                placeholder="Bedrooms"
                onChange={(e) => setBedrooms(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-evenly items-center">
              <p className="text-center">Beds :</p>
              <input
                className="m-1  border p-2"
                type="number"
                placeholder="Beds"
                onChange={(e) => setBeds(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-evenly items-center">
              <p className="text-center">Bathrooms :</p>
              <input
                className="m-1  border p-2"
                type="number"
                placeholder="Bathrooms"
                onChange={(e) => setBathrooms(e.target.value)}
              ></input>
            </div>
          </div>
          <h2 className="text-2xl mt-10 text-red-700">
            Step 2: Make your place stand out
          </h2>
          <hr className="border-black border-1 drop-shadow-lg"></hr>
          <p className="text-xl mt-4">
            Tell guests what your place has to offer?
          </p>
          <div className="grid sm:grid-cols-6 gap-4 m-4">
            {facilities.slice(1).map((facility, index) => (
              <div
                className={`flex flex-col justify-center items-center border rounded-md p-4 ${
                  amenitiesBg.includes(index) ? "bg-green-200" : ""
                }`}
                key={index}
                onClick={() => {
                  if (amenity.includes(facility.name)) {
                    setAmenity((prevAmenity) =>
                      prevAmenity.filter((c) => c != facility.name)
                    );
                  } else {
                    setAmenity((prevAmenity) => [
                      ...prevAmenity,
                      facility.name,
                    ]);
                  }
                  amenitiesBg.includes(index)
                    ? handleRemoveBg(index, setAmenitiesBg)
                    : handleAddBg(index, amenitiesBg, setAmenitiesBg);
                }}
              >
                <div>{facility.icon}</div>
                <p className="text-xs">{facility.name}</p>
              </div>
            ))}
          </div>
          <p className="text-xl mt-4">Add some photos of your place</p>
          <DragDropContext onDragEnd={handleDragPhotos}>
            <Droppable droppableId="photos" direction="horizontal">
              {(provided) => (
                <div
                  className="my-2 p-10 border w-fit"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {photos.length < 1 && (
                    <>
                      <input
                        id="image"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      ></input>
                      <label
                        className="flex flex-col justify-center items-center"
                        htmlFor="image"
                      >
                        <div className="flex">
                          <IoImages size={50} />
                        </div>
                        <p>Upload your photos</p>
                      </label>
                    </>
                  )}
                  {photos.length >= 1 && (
                    <div className="grid sm:grid-cols-2 gap-10">
                      {photos.map((photo, index) => {
                        return (
                          <div className="flex flex-col justify-center items-center">
                            <img
                              className="h-60 w-80"
                              src={URL.createObjectURL(photo)}
                              alt="place"
                            />
                            <button
                              className="p-2"
                              type="button"
                              onClick={() => handleRemovePhotos(index)}
                            >
                              <BiTrash size={20} color="red" />
                            </button>
                          </div>

                          //   <Draggable
                          //     key={index}
                          //     draggableId={index.toString()}
                          //     index={index}
                          //   >
                          //     {(provided) => {
                          //       <div
                          //         ref={provided.innerRef}
                          //         {...provided.draggableProps}
                          //         {...provided.dragHandleProps}
                          //       >
                          //         <img
                          //           src={URL.createObjectURL(photo)}
                          //           alt="place"
                          //         />
                          //         <button
                          //           type="button"
                          //           onClick={() => handleRemovePhotos(index)}
                          //         >
                          //           <BiTrash />
                          //         </button>
                          //       </div>;
                          //     }}
                          //   </Draggable>
                        );
                      })}

                      <input
                        id="image"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      ></input>
                      <label
                        className="flex flex-col justify-center items-center"
                        htmlFor="image"
                      >
                        <div className="flex">
                          <IoImages size={50} />
                        </div>
                        <p>Upload your photos</p>
                      </label>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <p className="text-xl mt-4">
            What makes your place attractive and exciting
          </p>
          <div className="my-1">
            <p>Title</p>
            <textarea
              className="border p-2 w-full rounded-md"
              type="text"
              placeholder="Title"
              rows={1}
              onChange={(e) => {
                const newDetail = {
                  ...details,
                  title: e.target.value,
                };
                setDetails(newDetail);
              }}
            />
            <p>Description</p>
            <textarea
              className="border p-2 w-full rounded-md"
              type="text"
              placeholder="Description"
              rows={2}
              onChange={(e) => {
                const newDetail = {
                  ...details,
                  description: e.target.value,
                };
                setDetails(newDetail);
              }}
            />
            <p>Highlights</p>
            <textarea
              className="border p-2 w-full rounded-md"
              type="text"
              placeholder="Highlights"
              rows={1}
              onChange={(e) => {
                const newDetail = {
                  ...details,
                  highlights: e.target.value,
                };
                setDetails(newDetail);
              }}
            />
            <p>Highlight details</p>
            <textarea
              className="border p-2 w-full rounded-md"
              type="text"
              placeholder="Highlight details"
              rows={2}
              onChange={(e) => {
                const newDetail = {
                  ...details,
                  highlightDetails: e.target.value,
                };
                setDetails(newDetail);
              }}
            />
            <p>Set price</p>
            <input
              className="border p-2"
              type="number"
              placeholder="Set price"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
        </div>
        <button
          className="bg-black p-3 rounded-lg text-white text-lg hover:bg-green-900"
          onClick={handlePublish}
        >
          Publish Listing
        </button>
        <Footer/>
      </div>
    </>
  );
};

export default CreateListing;
