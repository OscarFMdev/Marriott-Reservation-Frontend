// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const bookURL = 'http://127.0.0.1:3000/api/v1/users';

// const initialState = {
//   status: 'idle',
//   message: '',
//   error: '',
// };

// const GET_BOOKING = 'GET_BOOKING';
// const BOOKING = 'BOOKING';
// const DELETE_BOOKING = 'DELETE_BOOKING';

// export const getBooking = createAsyncThunk( GET_BOOKING, async () => {
//   const response = await fetch(`${bookURL}/bookings`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     Authorization: localStorage.getItem('token'),
//   });
//   }
