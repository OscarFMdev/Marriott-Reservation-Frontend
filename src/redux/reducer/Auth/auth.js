import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://127.0.0.1:3000/api/v1/';
const initialState = {
  user: {},
  status: 'idle',
  message: '',
  error: '',
};

const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';
const GET_USER = 'GET_USER';

export const signUp = createAsyncThunk(SIGNUP, async (user) => {
  const response = await fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });

  const { status: code } = response;
  if (code === 200) {
    localStorage.setItem('token', response.headers.get('Authorization'));
    const { data, message } = await response.json();
    return {
      status: 'success',
      message,
      data,
    };
  }

  if (code === 422) {
    const { data } = await response.json();
    return {
      data,
      status: 'failed',
      message: 'The email already exists or the password is too short',
      error: 'Signup failed',
    };
  }

  return null;
});

export const signIn = createAsyncThunk(LOGIN, async (user) => {
  const response = await fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  const { status: code } = response;
  if (code === 200) {
    localStorage.setItem('token', response.headers.get('Authorization'));
    const { data, message } = await response.json();
    return {
      status: 'success',
      message,
      data,
    };
  }

  if (code === 401) {
    return {
      status: 'failed',
      message: 'Invalid email or password',
      error: 'Login failed, Please check your email and password',
    };
  }

  return null;
});

export const getUser = createAsyncThunk(GET_USER, async () => {
  await fetch(`${baseURL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  }).then((res) => {
    if (res.ok) {
      const user = res.json();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    return res.json().then((json) => Promise.reject(json));
  });
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(signUp.fulfilled, (state, action) => ({
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      }))
      .addCase(signUp.rejected, (state) => ({
        ...state,
        status: 'failed',
        error: 'Network Error',
      }))
      .addCase(signIn.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(signIn.fulfilled, (state, action) => ({
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      }))
      .addCase(signIn.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload.message,
      }));
  },
});

export default authSlice.reducer;
