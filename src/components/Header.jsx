import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {

    const auth = localStorage.getItem('auth')

    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('auth')
        navigate('/login')
    }

    if(!auth){
        return null
    }

  return (
    <div>
        Header
        <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default Header