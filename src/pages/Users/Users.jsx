import React from 'react'
import FilterTable from '../../components/Table/FilterTable'
import { FilterContainer } from '../../components/Table/FilterTableStyle'
import Select from '../../components/Select/Select'
import { AddEmployee, ButtonsContainer, MainContainer, OptionsContainer, UserActive, UserContainer, UserImg, UserInactive, UserInfo } from './UsersStyle'
import Table from '../../components/Table/Table'
import {
  BsFillTelephoneFill
} from 'react-icons/bs'

function Users() {

  const tableFilters = [
    "All Employee",
    "Active Employee",
    "Inactive Employee",
  ]

  const data = require('../../data/users/users.json')

  const cols = [
    {property: 'image', label: 'Name', display: (row) => (
      <UserContainer>
        <UserImg>
          <img src={row.photo} alt={row.id} />
        </UserImg>
          <UserInfo>
            <p>
              {row.name}
            </p>
            <p>
              #{row.id}
            </p>
            <p>
              Joined on {new Date().toLocaleString()}
            </p>
          </UserInfo>          
      </UserContainer>
      )},
      { property: 'email', label: 'Email' },
      { property: 'description', label: 'Description' },
      { property: 'contact', label: 'Contact', display: (row) => 
          <p><BsFillTelephoneFill /> {row.contact}</p>
      },
      { property: 'status', label: 'Status', display: (row) => 
          row.status?
            <UserActive>
              Active
            </UserActive>
          :
            <UserInactive>
              Inactive
            </UserInactive>
      }
  ]

  return (
    <MainContainer>
      <OptionsContainer>
        <FilterContainer>
          <FilterTable filters={tableFilters}/>
        </FilterContainer>
        <ButtonsContainer>
          <AddEmployee>
            + New Employee
          </AddEmployee>
          <Select />          
        </ButtonsContainer>
      </OptionsContainer>
      <Table data={data} cols={cols} />
    </MainContainer>
  )
}

export default Users