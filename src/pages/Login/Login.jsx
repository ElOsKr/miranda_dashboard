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
import { toast } from 'react-toastify';

const loginApi = async(mail,password) => {
  try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`,{
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({email: mail, password: password}),
          headers: {"Content-type": "application/json;charset=UTF-8"}
      })
      if(!response.ok){
          toast.error("Wrong user", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
      }else{
          const data = await response.json();
          return data;
      }
  }catch(e){
      console.log(e)
  }
}

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

  const handleForm = async (event) =>{
    event.preventDefault();
    const { token } = await loginApi(mail,pass)
    if(!token){
      return
    }
    login.dispatch({type: 'login', user: {mail,pass,token}})
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
        <Input type="text" name="mail" id="mail" onChange={handleMail} data-cy="mail"/>
        <br/>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" onChange={handlePass} data-cy="password"/>
        <Button type="submit" value="Enter" onClick={handleForm} name='submit' data-cy="submit"/>
      </Form>
    </MainContainer>
  )
}

export default Login