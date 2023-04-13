import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Select from '../../components/Select/Select'
import FilterTable from '../../components/Table/FilterTable'
import { FilterContainer } from '../../components/Table/FilterTableStyle'
import Table from '../../components/Table/Table'
import { useSelector, useDispatch } from 'react-redux'
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
import { bookingDelete, bookingsCall } from '../../features/bookings/bookingsSlice';
import CharginProgress from '../../components/CharginProgress'

function Bookings() {

  const tableFilters = [
    "All Bookings",
    "Checking In",
    "Checking Out",
    "In Progress"
  ]

  const dispatch = useDispatch();

  const data = useSelector(state => state.bookings.bookings)

  const isLoading = useSelector(state => state.bookings.isLoading);

  useEffect(()=>{
      dispatch(bookingsCall());
  },[]);

  const handleDeleteRoom = (id) => {
    dispatch(bookingDelete(id))
  }


  const cols = [
    {property: 'image', label: 'Room', display: (row) => (
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
      { property: 'orderDate', label: 'Order Date', display: (row) =>
        <p>{row.orderDate.date} {row.orderDate.hour}</p>
      },
      { property: 'checkin', label: 'Check In', display: (row) =>
        <>
          <p>{row.checkin.date}</p>
          <HourMini>{row.checkin.hour}</HourMini>
        </>
      },
      { property: 'checkout', label: 'Check Out', display: (row) => 
        <>
          <p>{row.checkout.date}</p>
          <HourMini>{row.checkout.hour}</HourMini>
        </>
      },
      { property: 'specialRequest', label: 'Special Request', display: (row) => 
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
      { property: 'state', label: 'Status', display: (row) => 
        row.status === 'checkIn' ? 
          <CheckIn>Check In</CheckIn>
        :
        row.status === 'checkOut' ?
          <CheckOut>Check Out</CheckOut> 
        :
          <InProgress>In Progress</InProgress>   
      },
      { property: 'deleteRoom', label: '', display: (row) =>
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