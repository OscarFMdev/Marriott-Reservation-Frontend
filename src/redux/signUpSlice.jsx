import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  msg: '',
  user: '',
  token: '',
  loading: false,
  error: '',
};

const signUpSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: {

  },

});

export default signUpSlice.reducer;
