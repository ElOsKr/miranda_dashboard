import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import users from '../../data/users/users.json'

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
        // const response = await fetch(users);
        // const data = await response.json();
        const data = users
        return data;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
};

//functions for user

export const getUser = async (userId) => {
    try{
        // const response = await fetch(rooms);
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
    extraReducers: {
        //users
        [usersCall.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [usersCall.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.users = action.payload;
        },
        [usersCall.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        //user
        [userCall.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [userCall.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.user = action.payload;
        },
        [userCall.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        [userDelete.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [userDelete.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.users = state.users.filter(room => room.id!==action.payload)
            console.log("ID Deleted User: "+action.payload)
        },
        [userDelete.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        [userCreate.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [userCreate.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.userCreated = action.payload; 
        },
        [userCreate.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

export default usersSlice.reducer