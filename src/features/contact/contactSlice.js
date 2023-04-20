import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import contacts from '../../data/contact/contact.json'

function delay(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }

//Funtions for contacts

export const getContacts = async () => {
    try{
        // const response = await fetch(contacts);
        // const data = await response.json();
        const data = contacts
        return data;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
};

//functions for contact

export const getContact = async (contactId) => {
    try{
        // const response = await fetch(contacts);
        // const data = await response.json();
        const data = contacts;
        let contact = data.find(({id}) => id===contactId);
        return contact;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
};

export const updateContact = async (contactId) => {
    try{
        // const response = await fetch(contacts);
        // const data = await response.json();
        const data = contacts;
        let contact = data.find(({id}) => id===contactId);
        return contact;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

// export const deleteContact = async (contactId) => {
//     try{
//         // const response = await fetch(contacts);
//         // const data = await response.json();
//         const data = contacts;
//         const contact = data.filter((contact) => contact.id!==contactId);
//         console.log(contact)
//         return contact;
//     }catch(err){
//         alert(`Error while procesing data from api ${err}`);
//     };
// }

export const createContact = async (dataContact) => {
    try{
        console.log(dataContact)
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

const initialState = {
    contacts: [],
    contact: {},
    isLoading: false,
    hasError: false
}

//Thunks for contacts

export const contactsCall = createAsyncThunk(
    'contacts/getContacts',
    async () => {
        return await delay(getContacts())
    }
);

//Thunks for contact

export const contactCall = createAsyncThunk(
    'contact/getContact',
    async (id) => {
        return await delay(getContact(id))
    }
);

export const contactDelete = createAsyncThunk(
    'contact/deleteContact',
    async (id) => {
        // const data = await deletecontact(id);
        // return data;
        return id
    }
);

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
                state.isLoading = true;
                state.hasError = false;                
            }
        );
        builder.addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state) => {
                state.isLoading = false;
                state.hasError = true;                
            }
        );
        builder.addMatcher(
            (action) => action.type.endsWith('/fulfilled'),
            (state,action) => {
                state.isLoading = false;
                state.hasError = false;

                if(action.type === contactsCall.fulfilled.type){
                    state.contacts = action.payload;
                }else if(action.type === contactCall.fulfilled.type){
                    state.contact = action.payload;
                }else if(action.type === contactDelete.fulfilled.type){
                    state.contacts = state.contacts.filter(contact => contact.id!==action.payload)
                    console.log("ID Deleted contact: "+action.payload)
                }              
            }
        )
    }
})

export default contactsSlice.reducer