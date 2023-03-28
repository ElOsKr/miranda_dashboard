import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { NavbarMain } from './NavbarStyle';

function Navbar() {

    const auth = useState(localStorage.getItem('auth'));

    const location = useLocation()

    if(!auth || location.pathname==="/login"){
        return null
    }


    return (
        <NavbarMain >
            Navbar
        </NavbarMain>
    )        
    

}

export default Navbar