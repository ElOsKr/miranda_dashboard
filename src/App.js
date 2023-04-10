import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequiredAuth from './components/RequiredAuth';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Bookings from './pages/Bookings/Bookings';
import Contact from './pages/Contact/Contact';
import Rooms from './pages/Rooms/Rooms';
import NewRoom from './pages/Rooms/NewRoom';
import Users from './pages/Users/Users';
import NewUser from './pages/Users/NewUser';
import BookingDescription from './pages/Bookings/BookingDescription';
import LoginProvider from './components/LoginProvider';


function App() {
  
  const [ close, setClose ] = useState(true);

  return (
    <LoginProvider>
      <div className='App'>
        <BrowserRouter basename='/miranda_dashboard'>
          {
            <div className={`navbar ${close ?'close':"open"}`}>
              <Navbar/>
              </div>
            }          
          <div className='app-container'>
            {<Header setClose={setClose} close={close}/>}
            <Routes>
              <Route path='/login' element={<Login setClose={setClose}/>} />        
              <Route path='/' element={<RequiredAuth><Dashboard /></RequiredAuth>} />
              <Route path='/bookings' element={<RequiredAuth><Bookings /></RequiredAuth>} />
              <Route path='/bookings/:bookingId' element={<RequiredAuth><BookingDescription /></RequiredAuth>} />
              <Route path='/contact' element={<RequiredAuth><Contact /></RequiredAuth>} />
              <Route path='/rooms' element={<RequiredAuth><Rooms /></RequiredAuth>} />
              <Route path='/rooms/newRoom' element={<RequiredAuth><NewRoom /></RequiredAuth>} />
              <Route path='/users' element={<RequiredAuth><Users /></RequiredAuth>} />
              <Route path='/users/newUser' element={<RequiredAuth><NewUser /></RequiredAuth>} />
              <Route path='*' element={<Login />} />
            </Routes>  
          </div>            
        </BrowserRouter>
      </div>      
    </LoginProvider>

  );
}

export default App;
