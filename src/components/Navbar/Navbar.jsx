import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { CircleLink, CompanyName, Copyright, ListLinks, LogoContainer, LogoLetter, MadeBy, NavbarMain, TitleLogo } from './NavbarStyle';
import{
    BsGrid1X2,
    BsCalendarCheckFill
} from 'react-icons/bs'
import{
    IoMdKey
} from 'react-icons/io'
import{
    HiUsers
} from 'react-icons/hi'
import{
    AiFillContacts
} from 'react-icons/ai'
import UserLogged from './UserLogged';

function Navbar() {

    const auth = useState(localStorage.getItem('auth'));

    const currentLocation = useLocation()

    if(!auth || currentLocation.pathname==="/login"){
        return null
    }

    const locations = [
        {
            component: <BsGrid1X2 />,
            name: 'Dashboard',
            locationString: '/'
        },
        {
            component: <IoMdKey />,
            name: 'Rooms',
            locationString: '/rooms'
        },
        {
            component: <BsCalendarCheckFill />,
            name: 'Bookings',
            locationString: '/bookings'
        },
        {
            component: <HiUsers />,
            name: 'Users',
            locationString: '/users'
        },
        {
            component: <AiFillContacts />,
            name: 'Contact',
            locationString: '/contact'
        }
        
    ]


    return (
        <NavbarMain >
            <LogoContainer>
                <LogoLetter>
                    H
                </LogoLetter>
                <TitleLogo>
                    <p>Hotel</p>
                    <p>Miranda</p>
                </TitleLogo>                
            </LogoContainer>
            <ListLinks>
                {locations.map((location,i) => {
                    return (
                    <li key={i}>
                        <CircleLink location={location.locationString} currentLocation={currentLocation.pathname}/>
                        <NavLink to={location.locationString} 
                            className= { ( { isActive}) => `${isActive? 'active': ''}`}
                        >
                            {location.component}
                            {location.name}
                        </NavLink>
                    </li>)
                })}
            </ListLinks>
            <UserLogged />
            <CompanyName>
                Hotel Miranda Admin Dashboard
            </CompanyName>
            <Copyright>
                © 2023 All Rights Reserved
            </Copyright>
            <MadeBy>
                Made with ♥ by Oscar Alcivar
            </MadeBy>
        </NavbarMain>
    )        
    

}

export default Navbar