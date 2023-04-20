import React, { useEffect } from 'react'
import FilterTable from '../../components/Table/FilterTable'
import { FilterContainer } from '../../components/Table/FilterTableStyle'
import Select from '../../components/Select/Select'
import { AddEmployee, ButtonsContainer, DeleteButton, MainContainer, OptionsContainer, UserActive, UserContainer, UserImg, UserInactive, UserInfo } from './UsersStyle'
import Table from '../../components/Table/Table'
import {
  BsFillTelephoneFill
} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDelete, usersCall } from '../../features/users/usersSlice'
import CharginProgress from '../../components/CharginProgress'

function Users() {

  const tableFilters = [
    "All Employee",
    "Active Employee",
    "Inactive Employee",
  ]

  const dispatch = useDispatch();

  const data = useSelector(state => state.users.users)

  const isLoading = useSelector(state => state.users.isLoading)

  useEffect(() => {
    dispatch(usersCall())
  },[])

  const handleDeleteUser = (id) => {
    dispatch(userDelete(id))
  }

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
      },
      { property: 'deleteRoom', label: '', display: (row) =>
        <DeleteButton onClick={()=>handleDeleteUser(parseInt(row.id))}>Delete</DeleteButton>
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
                <AddEmployee data-cy="addEmployee">
                <Link to="/users/newUser">
                    + New Employee
                  </Link>
                </AddEmployee>
                <Select />          
              </ButtonsContainer>
            </OptionsContainer>
            <Table data={data} cols={cols} />          
          </>
      }
    </MainContainer>
  )
}

export default Users