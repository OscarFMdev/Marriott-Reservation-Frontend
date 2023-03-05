import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const bookURL = 'http://127.0.0.1:3000/api/v1/users';

const initialState = {
  bookings: [],
  status: 'idle',
  message: '',
  error: '',
};

// const GET_BOOKING = 'GET_BOOKING';
const BOOKING = 'BOOKING';
// const DELETE_BOOKING = 'DELETE_BOOKING';

// export const fetchBookings = createAsyncThunk
// ('bookings/fetchBookings', async (user, booking) => {
//   const response = await fetch(`${bookURL}/${user}/bookings`);
//   const bookings = await response.json();
//   return bookings;
// }  const data = await response.json();
// return data;
// );

export const bookRoom = createAsyncThunk(BOOKING, async ({ user, booking }) => {
  console.log(user, booking);
  const response = await fetch(`${bookURL}/${user}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ booking }),
  });
  const data = await response.json();
  return data;
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    // getBooking: (state, action) => {
    //   state.bookings = action.payload;
    // },
    // deleteBooking: (state, action) => {
    //   state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookRoom.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(bookRoom.fulfilled, (state, action) => ({
        ...state,
        bookings: [
          ...(action.payload.status === 201 ? [action.payload.data] : []),
        ],
        message: action.payload.message,
        status: action.payload.status,
        error: action.payload.error,
      }))
      .addCase(bookRoom.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload.error,
      }));
  },
});

export default bookingSlice.reducer;
