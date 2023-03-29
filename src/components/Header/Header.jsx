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
      switch(location.pathname){
        case "/":
          setPath("Dashboard");
          break;
        case "/bookings":
          setPath("Bookings");
          break;
        case "/contact":
          setPath("Contact");
          break;
        case "/rooms":
          setPath("Rooms");
          break;
        case "/users":
          setPath("Users");
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