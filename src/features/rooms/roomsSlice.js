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

//Funtions for rooms

export const getRooms = async () => {
    try{
        const response = await apiCall("rooms","GET");
        return response;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
};

export const getAvailableRooms = async () => {
    try{
        const response = await getRooms();
        const availableRooms = response.filter((room) => room.status === true)
        return availableRooms;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
}

export const getBookedRooms = async () => {
    try{
        const response = await getRooms();
        const bookedRooms = response.filter((room) => room.status === false)
        return bookedRooms;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
}


//functions for room

export const getRoom = async (roomId) => {
    try{
        const response = await apiCall(`rooms/${roomId}`,"GET");
        return response;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
};

export const updateRoom = async (roomId,dataUpdate) => {
    try{
        const response = await apiCall(`rooms/${roomId}`,"PATCH",dataUpdate);
        return response;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

export const deleteRoom = async (roomId) => {
    try{
        const response = await apiCall(`rooms/${roomId}`,"DELETE");
        return response;
        
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
        throw err
    };
}

export const createRoom = async (dataRoom) => {
    try{
        const response = await apiCall(`rooms`,"POST",dataRoom);
        console.log(dataRoom)
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
    rooms: [],
    room: {},
    roomCreated: {},
    isLoading: false,
    hasError: false
}

//Thunks for rooms

export const roomsCall = createAsyncThunk(
    'rooms/getRooms',
    async () => {
        try{
            return await delay(getRooms())
        }catch(e){
            throw e
        } 
    }
);

export const roomsAvailableCall = createAsyncThunk(
    'rooms/getAvailableRooms',
    async () => {
        try{
            return await delay(getAvailableRooms())
        }catch(e){
            throw e
        }
    }
);

export const roomsBookedCall = createAsyncThunk(
    'rooms/getBookedRooms',
    async () => {
        try{
            return await delay(getBookedRooms())
        }catch(e){
            throw e
        }
    }
);

//Thunks for room

export const roomCall = createAsyncThunk(
    'room/getRoom',
    async (id) => {
        try{
            return await delay(getRoom(id))
        }catch(e){
            throw e
        }
    }
);

export const roomDelete = createAsyncThunk(
    'room/deleteRoom',
    async (id) => {
        try{
            await deleteRoom(id);
            return id
        }catch(e){
            throw e
        }
    }
);

export const roomCreate = createAsyncThunk(
    'room/createRoom',
    async (data) => {
        try{
            const dataRoom = await createRoom(data);
            return dataRoom;
        }catch(e){
            throw e
        }
    }
);

export const roomsSlice = createSlice({
    name: 'rooms',
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

                if(action.type === roomsCall.fulfilled.type){
                    state.rooms = action.payload;
                }else if(action.type === roomsAvailableCall.fulfilled.type){
                    state.rooms = action.payload;
                }else if(action.type === roomsBookedCall.fulfilled.type){
                    state.rooms = action.payload;
                }else if(action.type === roomCall.fulfilled.type){
                    state.room = action.payload;
                }else if(action.type === roomDelete.fulfilled.type){
                    state.rooms = state.rooms.filter(room => room.id!==action.payload)
                    console.log("ID Deleted Room: "+action.payload)
                }else if(action.type === roomCreate.fulfilled.type){
                    state.roomCreated = action.payload; 
                }              
            }
        )
    }
})

export default roomsSlice.reducer