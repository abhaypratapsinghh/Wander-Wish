
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setSearchListing: (state,action) => {
           state.searchListing = action.payload.listings;
        },
        setListing: (state, action) => { 
            state.listings=action.payload.listings
        },
        setTripList: (state, action) => {
            state.user.tripList=action.payload
        },
        setPropertyList: (state, action) => {
            state.user.propertyList=action.payload
        },
        setWishList: (state, action) => {
            state.user.wishList=action.payload
        },
        setReservationList: (state, action) => {
            state.user.reservationList=action.payload
        },
    }
})

export const { setLogin ,setLogout,setListing,setTripList,setPropertyList,setWishList,setReservationList,setSearchListing} = userSlice.actions
export default userSlice.reducer;