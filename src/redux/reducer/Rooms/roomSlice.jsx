import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASEURL = 'http://127.0.0.1:3000/api/v1';

const initialState = {
  rooms: [],
  status: '',
  message: '',
  error: '',
};

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

  const { status: code } = response;
  if (code === 201) {
    const { data, message } = await response.json();
    return {
      status: '',
      message,
      data,
    };
  }

  if (code === 401) {
    const { message } = await response.json();
    return {
      status: 'error',
      message,
    };
  }

  if (code === 422) {
    const { message } = await response.json();
    return {
      status: 'error',
      message,
    };
  }

  return null;
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
  initialState,
  reducers: {
    NewRoom: (state, action) => ({
      ...state,
      rooms: [...state.rooms, action.payload],
    }),
    PopRoom: (state, action) => ({
      ...state,
      rooms: state.rooms.filter((room) => room.id !== action.payload),
    }),
    setMessageEmpty: (state, action) => ({
      ...state,
      message: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRoom.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(addRoom.fulfilled, (state, action) => ({
        ...state,
        rooms: [
          ...(action.payload.status === 201 ? action.payload.data : []),
          ...state.rooms,
        ],
        message: action.payload.message,
        status: action.payload.status,
      }))
      .addCase(addRoom.rejected, (state, action) => ({
        ...state,
        status: 'error',
        message: action.payload.message,
      }))
      .addCase(fetchRooms.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchRooms.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        rooms: action.payload,
      }))
      .addCase(fetchRooms.rejected, (state, action) => ({
        ...state,
        status: 'error',
        message: action.payload.message,
      }))
      .addCase(deleteRoom.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(deleteRoom.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        rooms: state.rooms.filter((room) => room.id !== action.payload),
      }))
      .addCase(deleteRoom.rejected, (state, action) => ({
        ...state,
        status: 'error',
        message: action.payload.message,
      }));
  },
});

export default roomsSlice.reducer;
export const { NewRoom, PopRoom, setMessageEmpty } = roomsSlice.actions;
