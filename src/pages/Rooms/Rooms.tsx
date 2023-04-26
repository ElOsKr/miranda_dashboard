import React, { useEffect } from 'react'
import FilterTable from '../../components/Table/FilterTable'
import { FilterContainer } from '../../components/Table/FilterTableStyle'
import Select from '../../components/Select/Select'
import { 
  MainContainer,
  OptionsContainer,
  ButtonsContainer,
  RoomName,
  RoomImg,
  RoomInfo,
  AddRoom,
  OfferPrice,
  Available,
  Booked,
  Price,
  NoData,
  DeleteButton
} from './RoomsStyle'
import Table from '../../components/Table/Table'
import { Link } from 'react-router-dom'
import { roomDelete, roomsAvailableCall, roomsBookedCall, roomsCall } from '../../features/rooms/roomsSlice'
import CharginProgress from '../../components/CharginProgress'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

interface IExistenRoom{
  photo: string,
  number: string,
  id: string,
  type: string
  price: string,
  status: boolean,
  amenities: Array<string>
}

function Rooms() {

  const dispatch = useAppDispatch();

  const data = useAppSelector(state => state.rooms.rooms)

  const isLoading = useAppSelector(state => state.rooms.isLoading)

  useEffect(() => {
    dispatch(roomsCall())
  },[])

  const handleDeleteRoom = (id: number) => {
    dispatch(roomDelete(id))
  }

  const handleAllRooms = (): void => {
    dispatch(roomsCall())
  }

  const handleAvailableRooms = (): void => {
    dispatch(roomsAvailableCall())
  }

  const handleBookedRooms = (): void => {
    dispatch(roomsBookedCall())
  }

  const tableFilters = [
    {name: "All Rooms", action: handleAllRooms},
    {name: "Available Rooms", action: (handleAvailableRooms)},
    {name: "Booked Rooms", action: (handleBookedRooms)},
  ]

  const cols = [
    {property: 'image', label: 'Room', display: (row: IExistenRoom) => (
        <RoomName>
          <RoomImg>
            <img src={row.photo} alt={row.id} />
          </RoomImg>
            <RoomInfo>
              <p>
                #{row.id}
              </p>
              <p>
                {row.number}
              </p>
            </RoomInfo>          
        </RoomName>
      )},
      { property: 'type', label: 'Room Type' },
      { property: 'amenities', label: 'Amenities', display: (row: IExistenRoom) =>
        row.amenities?
          <p>{row.amenities}</p>
        :  
          <NoData>No amenities</NoData>
      },
      { property: 'price', label: 'Price', display: (row: IExistenRoom) => 
        <Price>${row.price} <span>/night</span></Price>
      },
      { property: 'offer', label: 'Offer Price', display: (row: any) => 
          row.offer?
            <OfferPrice>
              <p>{row.offer}%</p>
              <p>{row.price-(row.price*(row.offer/100))}</p>
            </OfferPrice>
          :
            <NoData>
              No offer
            </NoData>
      },
      { property: 'status', label: 'Status', display: (row: IExistenRoom) => 
        row.status? 
          <Available>Available</Available>
        :
          <Booked>Booked</Booked>  
      },
      { property: 'deleteRoom', label: '', display: (row: any) =>
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
            <ButtonsContainer>
              <AddRoom>
                <Link to='/rooms/newRoom'>
                  + New Room
                </Link>
              </AddRoom>
              <Select />          
            </ButtonsContainer>
          </OptionsContainer>
          <Table data={data} cols={cols} />
        </>
      }
    </MainContainer>
  )
}

export default Rooms