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



function Login(props: { setClose: (arg0: boolean) => void; }) {

  const login = useLogin()

  const [mail, setMail] = useState("");

  const [pass, setPass] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/")
    }
  },[])

  const handleForm = (event: React.ChangeEvent<HTMLInputElement & HTMLFormElement>) =>{
    event.preventDefault();
    login.dispatch({type: 'login', user: {mail,pass}})
    setTimeout(() => {
      if(localStorage.getItem("user")){
        props.setClose(false)
      }
    },100)
    setTimeout(() => navigate('/'), 100)
  }
  

  const handleMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  }

  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  }

  return (
    <MainContainer>
      <Form onSubmit={handleForm}>
        <Message>Email: admin@admin.com</Message>
        <Message>Password: admin</Message>
        <Label htmlFor="mail">Email</Label>
        <Input type="text" name="mail" id="mail" onChange={handleMail} data-cy="mail"/>
        <br/>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" onChange={handlePass} data-cy="password"/>
        <Button type="submit" value="Enter" onSubmit={handleForm} name='submit' data-cy="submit"/>
      </Form>
    </MainContainer>
  )
}

export default Login