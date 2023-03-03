import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await fetch('http://localhost:3000/api/v1/rooms');
  const rooms = await response.json();
  return rooms;
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [fetchRooms.pending]: (state) => {
      const value = state;
      value.status = 'loading';
    },
    [fetchRooms.fulfilled]: (state, action) => {
      const value = state;
      value.status = 'succeeded';
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
