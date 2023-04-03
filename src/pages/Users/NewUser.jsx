import React from 'react'
import { FormBtn, FormFooter, FormHeader, FormMain, FormPhoto, FormUserContainer, MainContainer, StatusContainer } from './NewUserStyle'
import { useState } from 'react'
import { useEffect } from 'react';

function NewUser() {

    const [img, setImg] = useState();

    const [imgURL, setImgURL] = useState(null)

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

  return (
    <MainContainer>
        <FormUserContainer>
            <FormHeader>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                    <label htmlFor="password">Password</label> 
                    <input type="password" name="password" id="password" />
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
                    <input type='email' name="email" id="email" />
                    <label htmlFor="phone">Phone</label>
                    <input type='tel' name="phone" id="phone" />
                    <label htmlFor="startDate">Start Date</label>
                    <input type="datetime-local" name="startDate" id="startDate" />
                </div>
                <div style={{marginRight: "75px"}}>
                    <label htmlFor="job">Job</label> 
                    <select name="job" id="job">
                        <option value="manager">Manager</option>
                        <option value="receptionist">Receptionist</option>
                        <option value="roomService">Room Service</option>
                    </select>  
                    <label htmlFor="Description">Functions description</label>
                    <textarea style={{resize: 'none'}}></textarea>
                    <label htmlFor="status">Status</label>
                    <StatusContainer>
                        <div>
                           <label htmlFor="status">Active</label>
                            <input type="radio" name="status" id="active" /> 
                        </div>
                        <div>
                            <label htmlFor="status">Inactive</label> 
                            <input type="radio" name="status" id="inactive" />  
                        </div>                      
                    </StatusContainer>
                </div>
            </FormMain>
            <FormFooter>
                <FormBtn>
                    Create User
                </FormBtn>
            </FormFooter>
        </FormUserContainer>
    </MainContainer>
  )
}

export default NewUser