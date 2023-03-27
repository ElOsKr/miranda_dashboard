import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequiredAuth from './components/RequiredAuth';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import Rooms from './pages/Rooms';
import Users from './pages/Users';


function App() {

  return (
    <BrowserRouter basename='/miranda-dashboard'>
          <Header />
          <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />        
              <Route path='/' element={<RequiredAuth><Dashboard /></RequiredAuth>} />
              <Route path='/bookings' element={<RequiredAuth><Bookings /></RequiredAuth>} />
              <Route path='/contact' element={<RequiredAuth><Contact /></RequiredAuth>} />
              <Route path='/rooms' element={<RequiredAuth><Rooms /></RequiredAuth>} />
              <Route path='/users' element={<RequiredAuth><Users /></RequiredAuth>} />
        </Routes>              
  </BrowserRouter>
  );
}

export default App;
