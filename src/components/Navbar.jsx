import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function Navbar() {

    const auth = useState(localStorage.getItem('auth'));

    const location = useLocation()

    if(!auth || location.pathname==="/login"){
        return null
    }else{
        return (
            <div>Navbar</div>
        )        
    }

}

export default Navbar