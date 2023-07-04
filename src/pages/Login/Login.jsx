import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
  MainContainer,
  Form,
  Label,
  Input,
  Button,
  Message,
  LogoContainer,
  TitleLogo,
  LogoLetter
} from './LoginStyle';
import { useLogin } from '../../components/LoginProvider';
import { toast } from 'react-toastify';

let toastMSG = (msg = "Wrong User") => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })
} 

const loginApi = async(mail,password) => {
  try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`,{
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({email: mail, password: password}),
          headers: {"Content-type": "application/json;charset=UTF-8"}
      })
      if(!response.ok){
          toastMSG("Wrong User")
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

  const [mail, setMail] = useState("admin@admin.com");

  const [pass, setPass] = useState("admin");

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/")
    }
  },[])

  const handleForm = async (event) =>{
    event.preventDefault();
    if(mail===""){
      return toastMSG("Empty Email")
    }
    if(pass===""){
      return toastMSG("Empty Password")
    }
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
        <LogoContainer>
            <LogoLetter>
                H
            </LogoLetter>
            <TitleLogo>
                <p>Hotel</p>
                <p>Miranda</p>
          </TitleLogo>                
        </LogoContainer>
        <Message>Email: admin@admin.com</Message>
        <Message>Password: admin</Message>
        <Label htmlFor="mail">Email</Label>
        <Input type="text" name="mail" id="mail" onChange={handleMail} data-cy="mail" value={mail}/>
        <br/>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" onChange={handlePass} data-cy="password" value={pass}/>
        <Button type="submit" value="Enter" onClick={handleForm} name='submit' data-cy="submit"/>
      </Form>
    </MainContainer>
  )
}

export default Login