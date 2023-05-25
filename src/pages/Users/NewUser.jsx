import React from 'react'
import { FormBtn, FormFooter, FormHeader, FormMain, FormPhoto, FormUserContainer, MainContainer, StatusContainer } from './NewUserStyle'
import { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userCreate } from '../../features/users/usersSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewUser() {

    const dispatch = useDispatch();

    const [img, setImg] = useState();

    const [imgURL, setImgURL] = useState(null)

    const [name, setName] = useState();

    const [password, setPassword] = useState();

    const [email, setEmail] = useState();

    const [phone, setPhone] = useState();

    const [startDate, setStartDate] = useState();

    const [job, setJob] = useState();

    const [status, setStatus] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        if(img){
            setImgURL(URL.createObjectURL(img))
        }else{
            setImgURL(null)
        }
    },[img])

    const handleImageChange = (event) => {
        setImg(event.target.files[0])
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleJobChange = (event) => {
        setJob(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        let isStatus = (status === "true");
        const newUser = {
            name: name,
            password: password,
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
            email: email,
            contact: phone,
            joined: startDate,
            description: job,
            status: isStatus
        }

        for(let key in newUser){
            if(!newUser[key]){
                return toast.error("Something is empty in the creation of the user", {
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
        }
        try{
            dispatch(userCreate(newUser))
            navigate('/users')
        }catch(e){
            console.log(e)
        }
        
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
                <div style={{marginRight: "150px"}}>
                    <label htmlFor="job">Job</label> 
                    <select name="job" id="job" onChange={handleJobChange} defaultValue="" data-cy="job">
                        <option value="" disabled>Select an option</option>
                        <option value="manager">Manager</option>
                        <option value="receptionist">Receptionist</option>
                        <option value="roomService">Room Service</option>
                    </select>  
                    <label htmlFor="status">Status</label>
                    <StatusContainer onChange={handleStatusChange}>
                        <div>
                           <label htmlFor="status">Active</label>
                            <input type="radio" name="status" id="active" data-cy="active" value={true}/> 
                        </div>
                        <div>
                            <label htmlFor="status">Inactive</label> 
                            <input type="radio" name="status" id="inactive" value={false}/>  
                        </div>                      
                    </StatusContainer>
                </div>
            </FormMain>
            <FormFooter>
                <FormBtn type='submit' value="Create User" style={{padding: "10px 20px"}} onSubmit={handleSubmit} data-cy="submit"/>
            </FormFooter>
        </FormUserContainer>
    </MainContainer>
  )
}

export default NewUser