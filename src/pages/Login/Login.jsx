import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {

  const [mail, setMail] = useState("");

  const [pass, setPass] = useState("");

  const navigate = useNavigate()

  const handleForm = (event) =>{
    event.preventDefault();

    if(mail==='admin@admin.com' && pass==='admin'){
      localStorage.setItem("auth",true);
      props.setAuth(true)
      navigate('/')
    }else{
      alert("Wrong user / password");
    }
  }

  const handleMail = (event) => {
    setMail(event.target.value);
  }

  const handlePass = (event) => {
    setPass(event.target.value);
  }

  return (
    <form onSubmit={handleForm}>
      <label htmlFor="mail">Email</label>
      <input type="text" name="mail" id="mail" onChange={handleMail}/>
      <br/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" onChange={handlePass}/>
      <input type="submit" value="Check" onClick={handleForm}/>
    </form>
  )
}

export default Login