import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  BookingContainer, 
  DataContainer, 
  DateContainer, 
  DateDiv, 
  Facilitie, 
  Info, 
  InfoContainer, 
  MessageButton, 
  PhotoContainer, 
  RoomDescription, 
  RoomFacilities, 
  RoomInfo, 
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
import { useDispatch, useSelector } from 'react-redux';
import { bookingCall, bookingDelete } from '../../features/bookings/bookingsSlice';
import { Skeleton } from '@mui/material';

function BookingDescription() {

  const navigate = useNavigate()

  const bookingId = useParams();

  const dispatch = useDispatch();

  let booking = useSelector(state => state.bookings.booking);

  let isLoading = useSelector(state => state.bookings.isLoading)

  let hasError = useSelector(state => state.bookings.hasError);
  
  useEffect(()=>{
    dispatch(bookingCall((bookingId.bookingId)));
  },[])

  useEffect(()=>{
    if(hasError){
      setTimeout(()=>dispatch(bookingCall((bookingId.bookingId))),5000)
    }
  },[hasError])

  const handleDeleteRoom = (id) => {
    dispatch(bookingDelete(id))
    navigate('/bookings')
  }

  return (
    <MainContainer>
      <BookingContainer>
        <DataContainer>
          <UserContainer>
            <UserPhoto>
              {isLoading||hasError?
                <Skeleton variant="rounded" width={156} height={156} animation="wave" />
              :
                <img src="https://avatars.githubusercontent.com/u/60935066?v=4" alt="aritos20" />
              }
            </UserPhoto>
            <UserData>
              {isLoading||hasError?
                <>
                  <Skeleton animation="wave" width={50} height={48}/>
                  <Skeleton animation="wave" width={20}/>              
                </>
              :
                <>
                  <h2>{booking.guest}</h2>
                  <p>ID {booking?.id}</p>                
                </>
              }
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
            <SlOptionsVertical onClick={() => handleDeleteRoom(booking.id)} />
            </UserOptions>
          </UserContainer>
          <DateContainer>
            <DateDiv>
              <p>Check In</p>
              {isLoading||hasError?
                <Skeleton animation="wave" height={30} />
                :
                <p>{new Date(booking.checkin).toLocaleString()}</p>
              }
              
            </DateDiv>
            <DateDiv>
              <p>Check Out</p>
              {isLoading||hasError?
                <Skeleton animation="wave" height={30} />
                :
                <p>{new Date(booking.checkout).toLocaleString()}</p>
              }
              
            </DateDiv>
          </DateContainer>
          <InfoContainer>
            <RoomInfo>
              <Info>
                <p>Room Info</p>
                {isLoading||hasError?
                  <Skeleton animation="wave" height={30} />
                  :
                  <p>{booking?.typeRoom}</p>
                }
                
              </Info>
              <Info>
                <p>Price</p>
                {isLoading||hasError?
                  <Skeleton animation="wave" height={30} />
                  :
                  <p>$ {booking?.price} <span>/night</span></p>
                }
                
              </Info>
            </RoomInfo>
            <RoomDescription>
              {isLoading||hasError?
                <>
                <Skeleton animation="wave" height={30} width={350}/>
                <Skeleton animation="wave" height={30} width={350}/>
                </>
                :
                booking?.description
              }
            </RoomDescription>
            <RoomFacilities>
              <p>Facilities</p>
              {isLoading||hasError?
                <Skeleton animation="wave" height={30} width={50}/>
                :
                booking.amenities?.map((item, i)=>{
                  return <Facilitie key={i}>{item}</Facilitie>
                })
              }

            </RoomFacilities>
          </InfoContainer>
        </DataContainer>
        <PhotoContainer>
          {isLoading||hasError?
            <Skeleton animation="wave" height={606} sx={{transform: "scaleY(1.5)"}}/>
            :
            <img src={booking.photo} alt="roomPhoto" />
          }
          
        </PhotoContainer>
      </BookingContainer>
      </MainContainer>
  )
}

export default BookingDescription