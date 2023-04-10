import React from 'react'
import { Navigate } from 'react-router-dom';
import { useLogin } from './LoginProvider';

function RequiredAuth({children}) {

    const auth = useLogin();
    
    if(!auth.user.isLogged){
        return <Navigate to="/login"/>
    }

    return children

  
}

export default RequiredAuth