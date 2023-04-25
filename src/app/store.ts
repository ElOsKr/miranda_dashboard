import { configureStore } from '@reduxjs/toolkit';
import bookingsSlice from '../features/bookings/bookingsSlice';
import roomsSlice from '../features/rooms/roomsSlice';
import usersSlice from '../features/users/usersSlice';
import contactSlice from '../features/contact/contactSlice';

export const store = configureStore({
  reducer: {
    bookings: bookingsSlice,
    rooms: roomsSlice,
    users: usersSlice,
    contacts: contactSlice
  },
});

export type StateRoot = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch