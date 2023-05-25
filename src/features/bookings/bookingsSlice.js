import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import bookings from '../../data/bookings/bookings.json'
import { apiCall } from '../api/apiConnection';
import { getRoom } from '../rooms/roomsSlice';

function delay(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }

//Funtions for bookings

export const getBookings = async () => {
    try{
        const response = await apiCall("bookings","GET");
        response.forEach(async (booking)=>{
            let room = await getRoom(booking.room_Id)
            booking.typeRoom = room[0].type
        })
        return response;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err;
    };
};

export const getCheckInBookings = async () => {
    try{
        const response = await getBookings();
        const checkInBookings = response.filter((booking) => booking.status === "checkIn")
        return checkInBookings;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

export const getCheckOutBookings = async () => {
    try{
        const response = await getBookings();
        const checkOutBookings = response.filter((booking) => booking.status === "checkOut")
        return checkOutBookings;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

export const getInProgressBookings = async () => {
    try{
        const response = await getBookings();
        const inProgressBookings = response.filter((booking) => booking.status === "inProgress")
        return inProgressBookings;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

//functions for booking

export const getBooking = async (bookingId) => {
    try{
        const response = await apiCall(`bookings/${bookingId}`,"GET");
        const room = await getRoom(response[0].room_Id);
        return {...response[0], typeRoom: room[0].type};
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
};

export const updateBooking = async (bookingId) => {
    try{
        // const response = await fetch(bookings);
        // const data = await response.json();
        const data = bookings;
        let booking = data.find(({id}) => id===bookingId);
        return booking;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

export const deleteBooking = async (bookingId) => {
    try{
        const response = await apiCall(`bookings/${bookingId}`,"DELETE");
        return response;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

export const createBooking = async (dataBooking) => {
    try{
        console.log(dataBooking)
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

const initialState = {
    bookings: [],
    booking: {},
    isLoading: false,
    hasError: false
}

//Thunks for bookings

export const bookingsCall = createAsyncThunk(
    'bookings/getBookings',
    async () => {
        try{
            return await delay(getBookings())
        }catch (e){
            throw e
        }
    }
);

export const bookingsCheckInCall = createAsyncThunk(
    'bookings/getBookings',
    async () => {
        return await delay(getCheckInBookings())
    }
);

export const bookingsCheckOutCall = createAsyncThunk(
    'bookings/getBookings',
    async () => {
        return await delay(getCheckOutBookings())
    }
);

export const bookingsInProgressCall = createAsyncThunk(
    'bookings/getBookings',
    async () => {
        return await delay(getInProgressBookings())
    }
);

//Thunks for booking

export const bookingCall = createAsyncThunk(
    'booking/getBooking',
    async (id) => {
        try{
            return await delay(getBooking(id))
        }catch (e){
            throw e
        }
    }
);

export const bookingDelete = createAsyncThunk(
    'booking/deleteBooking',
    async (id) => {
        await deleteBooking(id);
        return id;
    }
);

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
                state.isLoading = true;
                state.hasError = false;                
            }
        );
        builder.addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state) => {
                state.isLoading = false;
                state.hasError = true;                
            }
        );
        builder.addMatcher(
            (action) => action.type.endsWith('/fulfilled'),
            (state,action) => {
                state.isLoading = false;
                state.hasError = false;

                if(action.type === bookingsCall.fulfilled.type){
                    state.bookings = action.payload;
                }else if(action.type === bookingsCheckInCall.fulfilled.type){
                    state.bookings = action.payload;
                }else if(action.type === bookingsCheckOutCall.fulfilled.type){
                    state.bookings = action.payload;
                }else if(action.type === bookingsInProgressCall.fulfilled.type){
                    state.bookings = action.payload;
                }else if(action.type === bookingCall.fulfilled.type){
                    state.booking = action.payload;
                }else if(action.type === bookingDelete.fulfilled.type){
                    state.bookings = state.bookings.filter(booking => booking.id!==action.payload)
                    console.log("ID Deleted Booking: "+action.payload)
                }              
            }
        )
    }
})

export default bookingsSlice.reducer