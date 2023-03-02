import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://127.0.0.1:3000/api/v1/';
const initialState = {
  status: 'idle',
  message: '',
  error: '',
};

