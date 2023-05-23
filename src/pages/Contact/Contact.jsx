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
import { useDispatch, useSelector } from 'react-redux'
import { contactsArchivedCall, contactsCall } from '../../features/contact/contactSlice'
import CharginProgress from '../../components/CharginProgress'

function Contact() {

  const messages = require('../../data/dashboard/messages.json')

  const dispatch = useDispatch();

  const data = useSelector(state => state.contacts.contacts)

  const isLoading = useSelector(state => state.contacts.isLoading);

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
      { property: 'id', label: 'Id', display: (row) => 
        <p style={{textOverflow: "ellipsis", maxWidth: 80, overflow: "hidden",whiteSpace: "nowrap"}}>{row.id}</p>
      },
      { property: 'date', label: 'Date', display: (row) =>
        <p>{new Date().toLocaleString()}</p>
      },
      { property: 'custome', label: 'Customer', display: (row) =>
          <p>{row.customer.name}</p>
      },
      { property: 'email', label: 'Email', display: (row) => 
        <p>{row.customer.email}</p>
      },
      { property: 'number', label: 'Number', display: (row) => 
        <p>{row.customer.phone}</p>
      },
      { property: 'subject', label: 'Subject' },
      { property: 'comment', label: 'Comment', display: (row) =>
        <Comment>{row.comment}</Comment>
      },
      { property: 'status', label: 'Action', display: (row) => 
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
        {messages.map((message, i)=>{
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