import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import rooms from '../../data/rooms/rooms.json'

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
        // const response = await fetch(rooms);
        // const data = await response.json();
        const data = rooms
        return data;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
};

//functions for room

export const getRoom = async (roomId) => {
    try{
        // const response = await fetch(rooms);
        // const data = await response.json();
        const data = rooms;
        let booking = data.find(({id}) => id===roomId);
        return booking;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
};

export const updateRoom = async (roomId) => {
    try{
        // const response = await fetch(rooms);
        // const data = await response.json();
        const data = rooms;
        let booking = data.find(({id}) => id===roomId);
        return booking;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

// export const deleteRoom = async (roomId) => {
//     try{
//         // const response = await fetch(rooms);
//         // const data = await response.json();
//         const data = rooms;
//         const room = data.filter((room) => room.id!==roomId);
//         console.log(room)
//         return room;
//     }catch(err){
//         alert(`Error while procesing data from api ${err}`);
//     };
// }

export const createRoom = async (dataRoom) => {
    try{
        console.log(dataRoom)
        return (dataRoom)
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
        // const data = await deleteRoom(id);
        // return data;
        return id
    }
);

export const roomCreate = createAsyncThunk(
    'room/createRoom',
    async (data) => {
        // const data = await createRoom(data);
        // return data;
        return await delay(createRoom(data))
    }
);

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    extraReducers: {
        //rooms
        [roomsCall.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [roomsCall.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.rooms = action.payload;
        },
        [roomsCall.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        //room
        [roomCall.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [roomCall.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.room = action.payload;
        },
        [roomCall.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        [roomDelete.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [roomDelete.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.rooms = state.rooms.filter(room => room.id!==action.payload)
            console.log("ID Deleted Room: "+action.payload)
        },
        [roomCreate.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        [roomCreate.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [roomCreate.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.roomCreated = action.payload; 
        },
        [roomCreate.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

export default roomsSlice.reducer