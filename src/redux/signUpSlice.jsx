import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  msg: '',
  user: '',
  token: '',
  loading: false,
  error: '',
};

const signUpUser = createAsyncThunk('userSignUp', async (body) => {
  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.json();
});

const signUpSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: {
    [signUpUser.pending]: (state) => {
      const s = state;
      s.loading = true;
    },
    [signUpUser.fulfilled]: (state, { payload: { msg, error } }) => {
      const s = state;
      s.loading = false;
      if(error){
        s.error = error;
      }
      else{
        s.msg = msg;
      }          
    },
    [signUpUser.rejected]: (state) => {
      const s = state;
      s.loading = true;
    }
  },
});

export default signUpSlice.reducer;
export { signUpUser };
