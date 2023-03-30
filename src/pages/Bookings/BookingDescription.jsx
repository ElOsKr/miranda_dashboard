import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  BookingContainer, 
  DataContainer, 
  MessageButton, 
  PhotoContainer, 
  TelephoneButton, 
  UserContact, 
  UserContainer, 
  UserData, 
  UserOptions, 
  UserPhoto 
} from './BookingDescriptionStyle';
import { MainContainer } from './BookingsStyle';
import {
  BsFillTelephoneFill
} from 'react-icons/bs'
import {
  AiOutlineMessage
} from 'react-icons/ai'
import {
  SlOptionsVertical
} from 'react-icons/sl'

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
    <MainContainer>
      <BookingContainer>
        <DataContainer>
          <UserContainer>
            <UserPhoto>
              <img src="https://avatars.githubusercontent.com/u/60935066?v=4" alt="aritos20" />
            </UserPhoto>
            <UserData>
              <h2>Aritos20</h2>
              <p>ID {booking.id}</p>
              <UserContact>
              <TelephoneButton>
                <BsFillTelephoneFill />
              </TelephoneButton>
              <MessageButton>
                <AiOutlineMessage />
                Send Message
              </MessageButton>
            </UserContact>
            </UserData>
            <UserOptions>
            <SlOptionsVertical />
            </UserOptions>
          </UserContainer>
        </DataContainer>
        <PhotoContainer>
          <img src={booking.photo} alt="roomPhoto" />
        </PhotoContainer>
      </BookingContainer>
      </MainContainer>
  )
}

export default BookingDescription