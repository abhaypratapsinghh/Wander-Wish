import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../../redux/state";
import { useState,useEffect } from "react";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";




const ReservationListPage = () => {
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const reservationList = useSelector((state) => state.user.reservationList);
  const dispatch = useDispatch();

  const getAllReservations = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/users/${userId}/reservation-list`,
      });
        if (response) {
          dispatch(setReservationList(response.data.reservations));
          setLoading(false);  
        }
        
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllReservations();
  }, []);
  

     return loading ? (
       <div className="flex justify-center">
         <Loader />
       </div>
     ) : (
       <div className="font-serif min-h-screen">
         <Navbar />
         <div className="m-4 bg-gray-300 rounded-md p-4 minh-screen">
           <h1 className="text-4xl font-semibold ">Your Reservation List</h1>
           <div className="flex flex-wrap justify-evenly">
             {reservationList?.map(
               ({
                 listingId,
                 startDate,
                 endDate,
                 totalPrice,
                 booking = true,
               }) => (
                 <ListingCard
                   listingId={listingId}
                   listingPhotoPaths={listingId.listingPhotoPaths}
                   city={listingId.city}
                   state={listingId.state}
                   country={listingId.country}
                   category={listingId.category}
                   types={listingId.types}
                   startDate={startDate}
                   endDate={endDate}
                   totalPrice={totalPrice}
                   booking={booking}
                 />
               )
             )}
           </div>
         </div>
         <div class="sticky top-[100vh]">
          <Footer/>
         </div>
       </div>
     );
};

export default ReservationListPage;
