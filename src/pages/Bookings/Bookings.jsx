import React from 'react'
import { Link } from 'react-router-dom'
import Select from '../../components/Select/Select'
import FilterTable from '../../components/Table/FilterTable'
import { FilterContainer } from '../../components/Table/FilterTableStyle'
import Table from '../../components/Table/Table'
import { BookingRoom, BookingRoomImg, GuestInfo, MainContainer, OptionsContainer, RequestButton, RequestButtonEmpty } from './BookingsStyle'

function Bookings() {

  const tableFilters = [
    "All Bookings",
    "Checking In",
    "Checking Out",
    "In Progress"
  ]

  const data = [
      {
        photo: "https://www.riazorhotel.com/wp-content/blogs.dir/1623/files/home/HOME_SLIDER_1-1.jpg",
        id: 1,
        guest: "Obama",
        orderDate: "29/3/2023",
        checkin: "29/3/2023",
        checkout: "30/3/2023",
        roomId: 45,
        price: 483,
        specialRequest: "Test",
        amenities: [
            "Tv",
            "Minibar"
        ],
        typeRoom: "Double Superior",
        description: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
        state: "checkin"
    }
  ]

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
      { property: 'orderDate', label: 'Order Date' },
      { property: 'checkin', label: 'Check In' },
      { property: 'checkout', label: 'Check Out' },
      { property: 'specialRequest', label: 'Special Request', display: (row) => 
          row.specialRequest!== ''?
            <RequestButton>
              View Notes
            </RequestButton>
          :
            <RequestButtonEmpty>
              View Notes
            </RequestButtonEmpty>
      },
      { property: 'typeRoom', label: 'Room Type' },
      { property: 'state', label: 'Status',},
  ]
  return (
    <MainContainer>
      <OptionsContainer>
        <FilterContainer>
          <FilterTable filters={tableFilters}/>
        </FilterContainer>
        <Select />
      </OptionsContainer>
      <Table data={data} cols={cols} />
    </MainContainer>
  )
}

export default Bookings