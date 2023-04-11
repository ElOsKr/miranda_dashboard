import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'

export const getBookings = async () => {
    try{
        const response = await fetch('./data/bookings/bookings.json');
        const data = await response.json();
        return [...data];
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
};

const initialState = {
    bookings: [],
    loading: false,
    error: false
}

export const bookingsCall = createAsyncThunk(
    'bookings/getBookings',
    async () => {
        const data = await getBookings()
        return data;
    }
);

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    extraReducers: {
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
        }
    }
})

export default bookingsSlice.reducer