import React from 'react'
import { FormBtn, FormFooter, FormHeader, FormMain, FormPhoto, FormUserContainer, MainContainer, StatusContainer } from './NewUserStyle'
import { useState } from 'react'
import { useEffect } from 'react';
import { userCreate } from '../../features/users/usersSlice';
import { useAppDispatch } from '../../hooks/hooks';

interface IUser {
    name: string,
    password: string,
    email: string,
    phone: string,
    startDate: string,
    job: string,
    description: string,
    status: string
}

const NewUser = () => {

    const dispatch = useAppDispatch();

    const [img, setImg] = useState();

    const [imgURL, setImgURL] = useState<string>()

    const [name, setName] = useState<string>();

    const [password, setPassword] = useState<string>();

    const [email, setEmail] = useState<string>();

    const [phone, setPhone] = useState<string>();

    const [startDate, setStartDate] = useState<string>();

    const [job, setJob] = useState<string>();

    const [functions , setFunctions] = useState<string>();

    const [status, setStatus] = useState<string>();

    const [ aux , setAux ] = useState(false)

    useEffect(() => {
        if(img){
            setImgURL(URL.createObjectURL(img))
        }else{
            setImgURL("")
        }
    },[img])

    const handleImageChange = (event: any) => {
        setImg(event.target.files[0])
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
    }

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value)
    }

    const handleJobChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setJob(event.target.value)
    }

    const handleFunctionsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFunctions(event.target.value)
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }

    const handleSubmit = (e : React.ChangeEvent<HTMLInputElement & HTMLFormElement>) => {
        
        e.preventDefault();

        const newUser: IUser = {
            name: name!,
            password: password!,
            email: email!,
            phone: phone!,
            startDate: startDate!,
            job: job!,
            description: functions!,
            status: status!
        }

        dispatch(userCreate(newUser))
        setAux(true)
    }

  return (
    <MainContainer>
        <FormUserContainer onSubmit={handleSubmit}>
            <FormHeader>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={handleNameChange} data-cy="name"/>
                    <label htmlFor="password">Password</label> 
                    <input type="password" name="password" id="password" onChange={handlePasswordChange} data-cy="password"/>
                </div>    
                <div>
                    <FormPhoto>
                        {imgURL?
                            <img src={imgURL} alt={'userPhoto'}/>
                        :
                            <p>Select a photo</p>
                        }
                    </FormPhoto>
                    <input type="file" name="photo" id="photo" accept="image/png, image/jpeg" onChange={handleImageChange}/>
                </div>       
            </FormHeader>
            <FormMain>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type='email' name="email" id="email" onChange={handleEmailChange} data-cy="email"/>
                    <label htmlFor="phone">Phone</label>
                    <input type='tel' name="phone" id="phone" onChange={handlePhoneChange} data-cy="phone"/>
                    <label htmlFor="startDate">Start Date</label>
                    <input type="datetime-local" name="startDate" id="startDate" onChange={handleStartDateChange} data-cy="startDate"/>
                </div>
                <div style={{marginRight: "75px"}}>
                    <label htmlFor="job">Job</label> 
                    <select name="job" id="job" onChange={handleJobChange} defaultValue="" data-cy="job">
                        <option value="" disabled>Select an option</option>
                        <option value="manager">Manager</option>
                        <option value="receptionist">Receptionist</option>
                        <option value="roomService">Room Service</option>
                    </select>  
                    <label htmlFor="Description">Functions description</label>
                    <textarea style={{resize: 'none'}} onChange={handleFunctionsChange} data-cy="functions"></textarea>
                    <label htmlFor="status">Status</label>
                    <StatusContainer onChange={handleStatusChange}>
                        <div>
                           <label htmlFor="status">Active</label>
                            <input type="radio" name="status" id="active" data-cy="active"/> 
                        </div>
                        <div>
                            <label htmlFor="status">Inactive</label> 
                            <input type="radio" name="status" id="inactive" />  
                        </div>                      
                    </StatusContainer>
                </div>
            </FormMain>
            <FormFooter>
                <FormBtn type='submit' value="Create User" style={{padding: "10px 20px"}} onSubmit={handleSubmit} data-cy="submit"/>
            </FormFooter>
                {!aux?
                    null
                    :
                    <p data-cy="done" style={{textAlign: 'center'}}>User created</p>
                }
        </FormUserContainer>
    </MainContainer>
  )
}

export default NewUser