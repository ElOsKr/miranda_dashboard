import React from 'react'

function Navbar() {

    const auth = localStorage.getItem('auth')

    if(!auth){
        return null
    }else{
        return (
            <div>Navbar</div>
        )        
    }

}

export default Navbar