import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import bookings from '../../data/bookings/bookings.json'

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
        // const response = await fetch(bookings);
        // const data = await response.json();
        const data = bookings
        return data;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
};

export const getCheckInBookings = async () => {
    try{
        // const response = await fetch(bookings);
        // const data = await response.json();
        const data = bookings
        const checkInBookings = data.filter((booking) => booking.status === "checkIn")
        return checkInBookings;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

export const getCheckOutBookings = async () => {
    try{
        // const response = await fetch(bookings);
        // const data = await response.json();
        const data = bookings
        const checkOutBookings = data.filter((booking) => booking.status === "checkOut")
        return checkOutBookings;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

export const getInProgressBookings = async () => {
    try{
        // const response = await fetch(bookings);
        // const data = await response.json();
        const data = bookings
        const inProgressBookings = data.filter((booking) => booking.status === "inProgress")
        return inProgressBookings;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

//functions for booking

export const getBooking = async (bookingId) => {
    try{
        // const response = await fetch(bookings);
        // const data = await response.json();
        const data = bookings;
        let booking = data.find(({id}) => id===bookingId);
        return booking;
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

// export const deleteBooking = async (bookingId) => {
//     try{
//         // const response = await fetch(bookings);
//         // const data = await response.json();
//         const data = bookings;
//         const booking = data.filter((booking) => booking.id!==bookingId);
//         console.log(booking)
//         return booking;
//     }catch(err){
//         alert(`Error while procesing data from api ${err}`);
//     };
// }

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
        return await delay(getBookings())
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
        return await delay(getBooking(id))
    }
);

export const bookingDelete = createAsyncThunk(
    'booking/deleteBooking',
    async (id) => {
        // const data = await deleteBooking(id);
        // return data;
        return id
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