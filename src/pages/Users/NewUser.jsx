import React from 'react'
import { FormHeader, FormPhoto, FormUserContainer, MainContainer } from './NewUserStyle'

function NewUser() {
  return (
    <MainContainer>
        <FormUserContainer>
            <FormHeader>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />                 
                </div>    
                <div>
                    <FormPhoto />
                    <input type="file" name="photo" id="photo" accept="image/png, image/jpeg" />
                </div>       
            </FormHeader>

        </FormUserContainer>
    </MainContainer>
  )
}

export default NewUser