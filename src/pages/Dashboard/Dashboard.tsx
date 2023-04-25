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


interface IKpiProps{
  name: string,
  number: string,
  icon: JSX.Element
}

interface IMessage{
  text: string,
  user:{
    photo: string,
    name: string,
    time: string
  }
}


const Dashboard = () => {

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

  const messages = require('../../data/dashboard/messages.json')

  return (
    <MainContainer>
        <KpisContainer>
          {kpis.map((kpi: IKpiProps, i: number)=>{
            return <Kpi props={kpi} key={i}/>
          })}
        </KpisContainer>
        <ReviewsContainer>
          <h3>Latest Review by Customers</h3>
          <MessagesContainer>
            {messages.map((message: IMessage , i: number)=>{
              return <Message props={message} key={i}/>
            })}
          </MessagesContainer>
        </ReviewsContainer>
    </MainContainer>
  )
}

export default Dashboard