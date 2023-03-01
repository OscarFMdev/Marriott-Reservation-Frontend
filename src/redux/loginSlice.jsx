import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  loading: false,

};

const loginUser = createAsyncThunk('user', async (body) => {
  await fetch('http://127.0.0.1:3000/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      localStorage.setItem('token', res.headers.get('Authorization'));
    }
    return res.text().then((text) => Promise.reject(text));
  });
});

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state) => {
      const s = state;
      s.user.jti = localStorage.getItem('token');
    },
    addUser: (state) => {
      const s = state;
      s.user = localStorage.getItem('user');
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      const s = state;
      s.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload: { user } }) => {
      const s = state;
      s.loading = false;
      s.user = user;
    },
    [loginUser.rejected]: (state) => {
      const s = state;
      s.loading = false;
    },
  },
});

export const { addToken, addUser } = loginSlice.actions;
export { loginUser };
export default loginSlice.reducer;
