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
import { userDelete, usersActiveCall, usersCall, usersInactiveCall } from '../../features/users/usersSlice'
import CharginProgress from '../../components/CharginProgress'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

interface IExistenUser {
  id: string,
  name: string,
  photo: string,
  email: string,
  description: string,
  contact: number,
  status: boolean
}

function Users() {

  const dispatch = useAppDispatch();

  const data = useAppSelector(state => state.users.users)

  const isLoading = useAppSelector(state => state.users.isLoading)

  useEffect(() => {
    dispatch(usersCall())
  },[])

  const handleDeleteUser = (id: number) => {
    dispatch(userDelete(id))
  }

  const handleAllUsers = () => {
    dispatch(usersCall())
  }

  const handleActiveUsers = () => {
    dispatch(usersActiveCall())
  }

  const handleInactiveUsers = () => {
    dispatch(usersInactiveCall())
  }

  const tableFilters = [
    {name: "All Employee", action: handleAllUsers},
    {name: "Active Employee", action: (handleActiveUsers)},
    {name: "Inactive Employee", action: (handleInactiveUsers)},
  ]

  const cols = [
    {property: 'image', label: 'Name', display: (row: IExistenUser) => (
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
      { property: 'contact', label: 'Contact', display: (row: IExistenUser) => 
          <p><BsFillTelephoneFill /> {row.contact}</p>
      },
      { property: 'status', label: 'Status', display: (row: IExistenUser) => 
          row.status?
            <UserActive>
              Active
            </UserActive>
          :
            <UserInactive>
              Inactive
            </UserInactive>
      },
      { property: 'deleteRoom', label: '', display: (row: any) =>
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