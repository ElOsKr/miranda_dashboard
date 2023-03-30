import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function BookingDescription() {

  const bookingId = useParams()

  const bookingList = require('../../data/bookings/bookings.json');

  const navigate = useNavigate();

  const booking = bookingList.find(booking => booking.id === parseInt(bookingId.bookingId))
  
  useEffect(()=>{
    if(!booking){
      navigate("/bookings")
    }
  },[])

  return (
    <div>{bookingId.bookingId}</div>
  )
}

export default BookingDescription