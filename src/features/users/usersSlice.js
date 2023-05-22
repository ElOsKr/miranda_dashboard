import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import users from '../../data/users/users.json'
import { apiCall } from '../api/apiConnection';

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
        //const data = users
        return response;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
};

export const getActiveUsers = async () => {
    try{
        // const response = await fetch(users);
        // const data = await response.json();
        const data = users
        const activeUsers = data.filter((user) => user.status === true)
        return activeUsers;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

export const getInactiveUsers = async () => {
    try{
        // const response = await fetch(users);
        // const data = await response.json();
        const data = users
        const inactiveUsers = data.filter((user) => user.status === false)
        return inactiveUsers;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

//functions for user

export const getUser = async (userId) => {
    try{
        // const response = await fetch(users);
        // const data = await response.json();
        const data = users;
        let user = data.find(({id}) => id===userId);
        return user;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
};

export const updateUser = async (userId) => {
    try{
        // const response = await fetch(users);
        // const data = await response.json();
        const data = users;
        let user = data.find(({id}) => id===userId);
        return user;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

// export const deleteUser = async (userId) => {
//     try{
//         // const response = await fetch(users);
//         // const data = await response.json();
//         const data = users;
//         const user = data.filter((user) => user.id!==userId);
//         console.log(user)
//         return user;
//     }catch(err){
//         alert(`Error while procesing data from api ${err}`);
//     };
// }

export const createUser = async (dataUser) => {
    try{
        console.log(dataUser)
        return (dataUser)
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
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
        return await delay(getUsers())
    }
);

export const usersActiveCall = createAsyncThunk(
    'users/getActiveUsers',
    async () => {
        return await delay(getActiveUsers())
    }
);

export const usersInactiveCall = createAsyncThunk(
    'users/getInactiveUsers',
    async () => {
        return await delay(getInactiveUsers())
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
        // const data = await deleteUser(id);
        // return data;
        return id
    }
);

export const userCreate = createAsyncThunk(
    'user/createUser',
    async (data) => {
        // const data = await createUser(data);
        // return data;
        return await delay(createUser(data))
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
                    state.users = state.users.filter(room => room.id!==action.payload)
                    console.log("ID Deleted User: "+action.payload)
                }else if(action.type === userCreate.fulfilled.type){
                    state.userCreated = action.payload;
                }              
            }
        )
    }
})

export default usersSlice.reducer