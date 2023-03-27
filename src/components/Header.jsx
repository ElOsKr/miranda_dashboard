import React from 'react'

function Header() {

    const auth = localStorage.getItem('auth')

    if(!auth){
        return null
    }

  return (
    <div>Header</div>
  )
}

export default Header