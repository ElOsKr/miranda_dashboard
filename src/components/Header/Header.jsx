import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HeaderStyled,
  MenuContainer,
  IconsContainer,
} from './HeaderStyle';
import { 
  HiOutlineMail,
} from "react-icons/hi";
import{
  BiBell
} from 'react-icons/bi';
import{
  TbLogout
} from 'react-icons/tb'
import {
  AiOutlineArrowLeft
} from 'react-icons/ai'

function Header(props) {

    const [ path, setPath ] = useState("");

    const auth = localStorage.getItem('auth');

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
      switch(true){
        case location.pathname==="/":
          setPath("Dashboard");
          break;
        case location.pathname==="/bookings":
          setPath("Bookings");
          break;
        case /\/bookings\/[0-9]/.test(location.pathname):
          setPath("Booking Details");
          break;
        case location.pathname==="/contact":
          setPath("Contact");
          break;
        case location.pathname==="/rooms":
          setPath("Rooms");
          break;
        case location.pathname==="/rooms/newRoom":
          setPath("New Room");
          break;
        case location.pathname==="/users":
          setPath("Users");
          break;
        case location.pathname==="/users/newUser":
          setPath("New User");
          break;
        default:
          setPath("");                              
      }
    },[location])

    const handleLogOut = () => {
        localStorage.removeItem('auth')
        navigate('/login')
        props.setClose(true)
    }

    if(!auth || location.pathname==='/login'){
        return null
    }

    const handleCloseNavbar = () => {
      if(props.close===true){
        props.setClose(false)
      }else{
        props.setClose(true)
      }
      
    }

  return (
    <HeaderStyled>
        <MenuContainer>
          <AiOutlineArrowLeft fontSize="20px" onClick={handleCloseNavbar}
            style={{rotate: !props.close?"180deg": "", transition: "all .8s"}}
          />
          {path}
        </MenuContainer>
        <IconsContainer>
          <HiOutlineMail />
          <BiBell />
          <TbLogout onClick={handleLogOut} />
        </IconsContainer>
    </HeaderStyled>
  )
}

export default Header