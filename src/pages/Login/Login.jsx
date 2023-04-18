import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
  MainContainer,
  Form,
  Label,
  Input,
  Button,
  Message
} from './LoginStyle';
import { useLogin } from '../../components/LoginProvider';

function Login(props) {

  const login = useLogin()

  const [mail, setMail] = useState("");

  const [pass, setPass] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/")
    }
  },[])

  const handleForm = (event) =>{
    event.preventDefault();
    login.dispatch({type: 'login', user: {mail,pass}})
    setTimeout(() => {
      if(localStorage.getItem("user")){
        props.setClose(false)
      }
    },100)
    setTimeout(() => navigate('/'), 100)
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
        <Button type="submit" value="Enter" onClick={handleForm} name='submit'/>
      </Form>
    </MainContainer>
  )
}

export default Login