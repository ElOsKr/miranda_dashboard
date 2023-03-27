import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
  MainContainer,
  Form,
  Label,
  Input,
  Button,
  Message
} from './LoginStyle';

function Login(props) {

  const [mail, setMail] = useState("");

  const [pass, setPass] = useState("");

  const navigate = useNavigate()

  const handleForm = (event) =>{
    event.preventDefault();

    if(mail==='admin@admin.com' && pass==='admin'){
      localStorage.setItem("auth",[true]);
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
    <MainContainer>
      <Form onSubmit={handleForm}>
        <Message>Email: admin@admin.com</Message>
        <Message>Password: admin</Message>
        <Label htmlFor="mail">Email</Label>
        <Input type="text" name="mail" id="mail" onChange={handleMail}/>
        <br/>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" onChange={handlePass}/>
        <Button type="submit" value="Enter" onClick={handleForm}/>
      </Form>
    </MainContainer>
  )
}

export default Login