import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

function RequiredAuth({children}) {

    const [ auth ] = useState(localStorage.getItem('auth'));
    
    if(!auth){
        return <Navigate to="/login"/>
    }

    return children

  
}

export default RequiredAuth