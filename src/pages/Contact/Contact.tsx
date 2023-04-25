import React, { useEffect } from 'react'
import FilterTable from '../../components/Table/FilterTable'
import { FilterContainer } from '../../components/Table/FilterTableStyle'
import Select from '../../components/Select/Select'
import {
  MainContainer,
  OptionsContainer,
  ButtonsContainer,
  ReviewsContainer,
  Archived,
  ButtonArchived,
  Comment
} from './ContactStyle'
import Message from '../../components/Dashboard/Message';
import Table from '../../components/Table/Table'
import { contactsArchivedCall, contactsCall } from '../../features/contact/contactSlice'
import CharginProgress from '../../components/CharginProgress'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

interface IMessage{
  text: string,
  user:{
    photo: string,
    name: string,
    time: string
  }
}

function Contact() {

  const messages = require('../../data/dashboard/messages.json')

  const dispatch = useAppDispatch();

  const data = useAppSelector(state => state.contacts.contacts)

  const isLoading = useAppSelector(state => state.contacts.isLoading);

  useEffect(()=>{
      dispatch(contactsCall());
  },[]);

  const handleAllContacts = () => {
    dispatch(contactsCall())
  }

  const handleArchived = () => {
    dispatch(contactsArchivedCall())
  }

  const tableFilters = [
    {name: "All Contacts", action: handleAllContacts},
    {name: "Archived", action: (handleArchived)},
  ]

  const cols = [
      { property: 'id', label: 'Id'},
      { property: 'date', label: 'Date', display: () =>
        <p>{new Date().toLocaleString()}</p>
      },
      { property: 'custome', label: 'Customer', display: (row: any) =>
          <p>{row.customer.name}</p>
      },
      { property: 'email', label: 'Email', display: (row: any) => 
        <p>{row.customer.email}</p>
      },
      { property: 'number', label: 'Number', display: (row: any) => 
        <p>{row.customer.phone}</p>
      },
      { property: 'subject', label: 'Subject' },
      { property: 'comment', label: 'Comment', display: (row: any) =>
        <Comment>{row.comment}</Comment>
      },
      { property: 'status', label: 'Action', display: (row: any) => 
        row.status?
          <Archived>
            <p>Archive</p>
            <p>*Already archived*</p>
          </Archived>
        :
          <ButtonArchived>
            Archive
          </ButtonArchived>  
      },
  ]

  if(isLoading){
    return(
      <MainContainer>
        <CharginProgress />
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <ReviewsContainer>
        {messages.map((message: IMessage, i: number)=>{
          return <Message props={message} key={i}/>
        })} 
      </ReviewsContainer>
      <OptionsContainer>
        <FilterContainer>
          <FilterTable filters={tableFilters}/>
        </FilterContainer>
        <ButtonsContainer>
          <Select />          
        </ButtonsContainer>
      </OptionsContainer>
      <Table data={data} cols={cols} />
    </MainContainer>
  )
}

export default Contact