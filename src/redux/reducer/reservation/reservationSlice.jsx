import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const bookURL = 'https://marriott-reservation.onrender.com/api/v1/users';

const initialState = {
  bookings: [],
  status: 'idle',
  message: '',
  error: '',
};

const GET_BOOKING = 'GET_BOOKING';
const BOOKING = 'BOOKING';
const DELETE_BOOKING = 'DELETE_BOOKING';

export const fetchBookings = createAsyncThunk(GET_BOOKING, async (user) => {
  const response = await fetch(`${bookURL}/${user}/bookings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  const data = await response.json();
  return data;
});

export const bookRoom = createAsyncThunk(BOOKING, async ({ user, booking }) => {
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

export const deleteBooking = createAsyncThunk(DELETE_BOOKING, async ({ user, id }) => {
  const response = await fetch(`${bookURL}/${user}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  const data = await response.json();
  return data;
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBook: (state, action) => ({
      ...state,
      bookings: [...state.bookings, action.payload],
    }),
    popBook: (state, action) => ({
      ...state,
      bookings: state.bookings.filter((booking) => booking.id !== action.payload),
    }),
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
          ...state.bookings,
        ],
        message: action.payload.message,
        status: action.payload.status,
        error: action.payload.error,
      }))
      .addCase(bookRoom.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload.error,
      }))
      .addCase(fetchBookings.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchBookings.fulfilled, (state, action) => ({
        ...state,
        bookings: action.payload,
        status: 'success',
        error: action.payload.error,
      }))
      .addCase(fetchBookings.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload.error,
      }))
      .addCase(deleteBooking.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(deleteBooking.fulfilled, (state, action) => ({
        ...state,
        bookings: state.bookings.filter((booking) => booking.id !== action.payload),
        status: 'success',
        message: 'Booking deleted successfully',
        error: action.payload.error,
      }));
  },
});

export const { addBook, popBook } = bookingSlice.actions;

export default bookingSlice.reducer;
