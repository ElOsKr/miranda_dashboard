import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import bookings from '../../data/bookings/bookings.json'

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
        const data = await getBookings()
        return data;
    }
);

//Thunks for booking

export const bookingCall = createAsyncThunk(
    'booking/getBooking',
    async (id) => {
        const data = await getBooking(id)
        return data;
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
    extraReducers: {
        //bookings
        [bookingsCall.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [bookingsCall.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.bookings = action.payload;
        },
        [bookingsCall.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        //booking
        [bookingCall.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [bookingCall.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.booking = action.payload;
        },
        [bookingCall.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        [bookingDelete.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [bookingDelete.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.bookings = state.bookings.filter(booking => booking.id!==action.payload)
            console.log("ID Deleted Booking: "+action.payload)
        },
        [bookingDelete.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

export default bookingsSlice.reducer