import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api/apiConnection';
import { toast } from 'react-toastify';

function delay(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }

//Funtions for users

export const getUsers = async () => {
    try{
        const response = await apiCall("users","GET");
        return response;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
};

export const getActiveUsers = async () => {
    try{
        const response = await getUsers();
        const activeUsers = response.filter((user) => user.status === true)
        return activeUsers;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
}

export const getInactiveUsers = async () => {
    try{
        const response = await getUsers();
        const inactiveUsers = response.filter((user) => user.status === false)
        return inactiveUsers;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
}

//functions for user

export const getUser = async (userId) => {
    try{
        const response = await apiCall(`users/${userId}`,"GET");
        return response;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
};

export const updateUser = async (userId,dataUpdate) => {
    try{
        const response = await apiCall(`users/${userId}`,"PATCH",dataUpdate);
        return response;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

export const deleteUser = async (userId) => {
    try{
        const response = await apiCall(`users/${userId}`,"DELETE");
        return response;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
}

export const createUser = async (dataUser) => {
    try{
        const response = await apiCall(`users`,"POST",dataUser);
        console.log(dataUser)
        toast.success("User created", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
        return (response)
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
}

const initialState = {
    users: [],
    user: {},
    userCreated: {},
    isLoading: false,
    hasError: false
}

//Thunks for users

export const usersCall = createAsyncThunk(
    'users/getUsers',
    async () => {
        try{
            return await delay(getUsers())
        }catch(e){
            throw e
        }
    }
);

export const usersActiveCall = createAsyncThunk(
    'users/getActiveUsers',
    async () => {
        try{
            return await delay(getActiveUsers())
        }catch(e){
            throw e
        }
    }
);

export const usersInactiveCall = createAsyncThunk(
    'users/getInactiveUsers',
    async () => {
        try{
            return await delay(getInactiveUsers())
        }catch(e){
            throw e
        }  
    }
);

//Thunks for user

export const userCall = createAsyncThunk(
    'user/getUser',
    async (id) => {
        return await delay(getUser(id))
    }
);

export const userDelete = createAsyncThunk(
    'user/deleteUser',
    async (id) => {
        try{
            await deleteUser(id);
            return id;            
        }catch(e){
            throw e
        }
    }
);

export const userCreate = createAsyncThunk(
    'user/createUser',
    async (data) => {
        try{
            const dataUser = await createUser(data);
            return dataUser;
        }catch(e){
            throw e
        }
    }
);

export const usersSlice = createSlice({
    name: 'users',
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

                if(action.type === usersCall.fulfilled.type){
                    state.users = action.payload;
                }else if(action.type === usersActiveCall.fulfilled.type){
                    state.users = action.payload;
                }else if(action.type === usersInactiveCall.fulfilled.type){
                    state.users = action.payload;
                }else if(action.type === userCall.fulfilled.type){
                    state.user = action.payload;
                }else if(action.type === userDelete.fulfilled.type){
                    state.users = state.users.filter(user => user.id!==action.payload)
                    console.log("ID Deleted User: "+action.payload)
                }else if(action.type === userCreate.fulfilled.type){
                    state.userCreated = action.payload;
                }              
            }
        )
    }
})

export default usersSlice.reducer