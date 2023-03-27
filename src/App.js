import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequiredAuth from './components/RequiredAuth';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Bookings from './pages/Bookings/Bookings';
import Contact from './pages/Contact/Contact';
import Rooms from './pages/Rooms/Rooms';
import Users from './pages/Users/Users';
import BookingDescription from './pages/Bookings/BookingDescription';
import RoomDescription from './pages/Rooms/RoomDescription';
import UserDescription from './pages/Users/UserDescription';


function App() {

  const [ auth, setAuth ] = useState(localStorage.getItem('auth'))  

  return (
    <div className='App'>
      <BrowserRouter basename='/miranda-dashboard'>
        {auth && <Header />}
        {auth && <Navbar />}
        <Routes>
          <Route path='/login' element={<Login setAuth={setAuth}/>} />        
          <Route path='/' element={<RequiredAuth><Dashboard /></RequiredAuth>} />
          <Route path='/bookings' element={<RequiredAuth><Bookings /></RequiredAuth>} />
          <Route path='/bookings/:bookingId' element={<RequiredAuth><BookingDescription /></RequiredAuth>} />
          <Route path='/contact' element={<RequiredAuth><Contact /></RequiredAuth>} />
          <Route path='/rooms' element={<RequiredAuth><Rooms /></RequiredAuth>} />
          <Route path='/rooms/:roomId' element={<RequiredAuth><RoomDescription /></RequiredAuth>} />
          <Route path='/users' element={<RequiredAuth><Users /></RequiredAuth>} />
          <Route path='/users:/userId' element={<RequiredAuth><UserDescription /></RequiredAuth>} />
        </Routes>              
      </BrowserRouter>
    </div>
  );
}

export default App;
