import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Select from '../../components/Select/Select'
import FilterTable from '../../components/Table/FilterTable'
import { FilterContainer } from '../../components/Table/FilterTableStyle'
import Table from '../../components/Table/Table'
import { 
  BookingRoom, 
  BookingRoomImg, 
  CheckIn, 
  CheckOut, 
  DeleteButton, 
  GuestInfo, 
  HourMini, 
  InProgress, 
  MainContainer, 
  OptionsContainer, 
  RequestButton, 
  RequestButtonEmpty 
} from './BookingsStyle'
import { bookingDelete, bookingsCall, bookingsCheckInCall, bookingsCheckOutCall, bookingsInProgressCall } from '../../features/bookings/bookingsSlice';
import CharginProgress from '../../components/CharginProgress'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

interface IBooking {
  photo: string,
  id: string,
  guest: string,
  orderDate: {
    date: string,
    hour: string
    },
  checkin: {
      date: string,
      hour: string
    },
  checkout: {
      date: string,
      hour: string
    },
  roomId: number,
  price: number,
  amenities: string[],
  typeRoom: string,
  description: string,
  specialRequest?: string,
  status: string
}

function Bookings() {

  const dispatch = useAppDispatch();

  const data = useAppSelector(state => state.bookings.bookings)

  const isLoading = useAppSelector(state => state.bookings.isLoading);

  useEffect(()=>{
      dispatch(bookingsCall());
  },[]);

  const handleDeleteRoom = (id: number) => {
    dispatch(bookingDelete(id))
  }

  const handleAllBookings = () => {
    dispatch(bookingsCall())
  }

  const handleCheckIn = () => {
    dispatch(bookingsCheckInCall())
  }

  const handleCheckOut = () => {
    dispatch(bookingsCheckOutCall())
  }

  const handleInProgress = () => {
    dispatch(bookingsInProgressCall())
  }

  const tableFilters = [
    {name: "All Bookings", action: handleAllBookings},
    {name: "Checking In", action: (handleCheckIn)},
    {name: "Checking out", action: (handleCheckOut)},
    {name: "In Progress", action: (handleInProgress)}
  ]

  const cols = [
    {property: 'image', label: 'Room', display: (row: IBooking) => (
      <Link to={`/bookings/${row.id}`}>
        <BookingRoom>
          <BookingRoomImg>
            <img src={row.photo} alt={row.id} />
          </BookingRoomImg>
            <GuestInfo>
              <p>
                {row.guest}
              </p>
              <p>
                #{row.id}
              </p>
            </GuestInfo>          
        </BookingRoom>
      </Link>
      )},
      { property: 'orderDate', label: 'Order Date', display: (row: IBooking) =>
        <p>{row.orderDate.date} {row.orderDate.hour}</p>
      },
      { property: 'checkin', label: 'Check In', display: (row: IBooking) =>
        <>
          <p>{row.checkin.date}</p>
          <HourMini>{row.checkin.hour}</HourMini>
        </>
      },
      { property: 'checkout', label: 'Check Out', display: (row: IBooking) => 
        <>
          <p>{row.checkout.date}</p>
          <HourMini>{row.checkout.hour}</HourMini>
        </>
      },
      { property: 'specialRequest', label: 'Special Request', display: (row: IBooking) => 
          row.specialRequest?
            <RequestButton>
              View Notes
            </RequestButton>
          :
            <RequestButtonEmpty>
              View Notes
            </RequestButtonEmpty>
      },
      { property: 'typeRoom', label: 'Room Type' },
      { property: 'state', label: 'Status', display: (row: IBooking) => 
        row.status === 'checkIn' ? 
          <CheckIn>Check In</CheckIn>
        :
        row.status === 'checkOut' ?
          <CheckOut>Check Out</CheckOut> 
        :
          <InProgress>In Progress</InProgress>   
      },
      { property: 'deleteRoom', label: '', display: (row: IBooking) =>
        <DeleteButton onClick={()=>handleDeleteRoom(parseInt(row.id))}>Delete</DeleteButton>
      }
  ]
  return (
    <MainContainer>
      {isLoading?
        <CharginProgress />   
        :
        <>
          <OptionsContainer>
            <FilterContainer>
              <FilterTable filters={tableFilters}/>
            </FilterContainer>
            <Select />
          </OptionsContainer>
          <Table data={data} cols={cols} />
        </>       
      }
    </MainContainer>

  )
}

export default Bookings