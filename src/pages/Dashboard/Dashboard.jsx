import React from 'react'
import { KpisContainer, MainContainer, MessagesContainer, ReviewsContainer } from './DashboardStyle'
import{
  BiBed
} from 'react-icons/bi';
import{
  TbLogout,
  TbLogin
} from 'react-icons/tb';
import{
  BsCalendarCheckFill
} from 'react-icons/bs'
import Kpi from '../../components/Dashboard/Kpi';
import Message from '../../components/Dashboard/Message';



function Dashboard() {

  const kpis = [
    {
      name: 'New Booking',
      number: '8,461',
      icon: <BiBed />
    },
    {
      name: 'Scheduled Room',
      number: '963',
      icon: <BsCalendarCheckFill />
    },
    {
      name: 'Check In',
      number: '753',
      icon: <TbLogin />
    },
    {
      name: 'Check Out',
      number: '516',
      icon: <TbLogout />
    }
  ]

  const messages = [
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      user: {
        photo: '../../assets/header/user_photo.jpg',
        name: 'Obama',
        time: '4m ago'
      }
    }
  ]

  return (
    <MainContainer>
        <KpisContainer>
          {kpis.map((kpi,i)=>{
            return <Kpi props={kpi} key={i}/>
          })}
        </KpisContainer>
        <ReviewsContainer>
          <h3>Latest Review by Customers</h3>
          <MessagesContainer>
          {messages.map((message, i)=>{
            return <Message props={message} key={i}/>
          })}
        </MessagesContainer>
        </ReviewsContainer>
    </MainContainer>
  )
}

export default Dashboard