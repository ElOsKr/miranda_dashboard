import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api/apiConnection';

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
    };
};

export const getAvailableRooms = async () => {
    try{
        const response = await getRooms();
        const availableRooms = response.filter((room) => room.status === true)
        return availableRooms;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

export const getBookedRooms = async () => {
    try{
        const response = await getRooms();
        const bookedRooms = response.filter((room) => room.status === false)
        return bookedRooms;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}


//functions for room

export const getRoom = async (roomId) => {
    try{
        const response = await apiCall(`rooms/${roomId}`,"GET");
        return response;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
};

export const updateRoom = async (roomId,dataUpdate) => {
    try{
        const response = await apiCall(`rooms/${roomId}`,"PATCH",dataUpdate);
        return response;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

export const deleteRoom = async (roomId) => {
    try{
        const response = await apiCall(`rooms/${roomId}`,"DELETE");
        return response;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

export const createRoom = async (dataRoom) => {
    try{
        const response = await apiCall(`rooms`,"POST",dataRoom);
        console.log(dataRoom)
        return (response)
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
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
        return await delay(getRooms())
    }
);

export const roomsAvailableCall = createAsyncThunk(
    'rooms/getAvailableRooms',
    async () => {
        return await delay(getAvailableRooms())
    }
);

export const roomsBookedCall = createAsyncThunk(
    'rooms/getBookedRooms',
    async () => {
        return await delay(getBookedRooms())
    }
);

//Thunks for room

export const roomCall = createAsyncThunk(
    'room/getRoom',
    async (id) => {
        return await delay(getRoom(id))
    }
);

export const roomDelete = createAsyncThunk(
    'room/deleteRoom',
    async (id) => {
        await deleteRoom(id);
        return id
    }
);

export const roomCreate = createAsyncThunk(
    'room/createRoom',
    async (data) => {
        const dataRoom = await createRoom(data);
        return dataRoom;
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