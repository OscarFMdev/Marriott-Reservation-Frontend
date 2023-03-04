import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASEURL = 'http://127.0.0.1:3000/api/v1';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await fetch(`${BASEURL}/rooms`);
  const rooms = await response.json();
  return rooms;
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (room) => {
  const response = await fetch(`${BASEURL}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ room }),
  });
  const newRoom = await response.json();
  if (newRoom.error) {
    return newRoom.error;
  }
  if (newRoom.message) {
    return newRoom.message;
  }
  return newRoom;
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id) => {
  const response = await fetch(`${BASEURL}/rooms/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  const deletedRoom = await response.json();
  return deletedRoom;
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    status: null,
    message: null,
  },

  reducers: {
    NewRoom: (state, action) => {
      const value = state;
      value.rooms.push(action.payload);
    },
    PopRoom: (state, action) => {
      const value = state;
      value.rooms.pop(action.payload);
    },
  },
  extraReducers: {
    [fetchRooms.pending]: (state) => {
      const value = state;
      value.status = 'loading';
    },
    [fetchRooms.fulfilled]: (state, action) => {
      const value = state;
      value.status = state.status;
      value.rooms = action.payload.map((room) => (
        {
          id: room.id,
          name: room.name,
          description: room.description,
          price: room.price,
          image: room.image,
          type: room.room_type,
        }
      ));
    },
    [fetchRooms.rejected]: (state, action) => {
      const value = state;
      value.status = 'failed';
      value.error = action.error.message;
    },
  },
});

export default roomsSlice.reducer;

export const { NewRoom, PopRoom } = roomsSlice.actions;
