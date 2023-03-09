import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'https://marriott-reservation.onrender.com/api/v1/';
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

export const getUser = createAsyncThunk(
  GET_USER,
  async () => {
    const response = await fetch(`${baseURL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const { status: code } = response;
    if (code === 200) {
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      return {
        status: 'success',
        data,
      };
    }

    if (code === 401) {
      return {
        status: 'failed',
        message: 'Please login to access this page',
        error: 'You are not authorized to access this page',
      };
    }
    return null;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => ({
      ...state,
      message: action.payload,
    }),
  },
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
        user: action.payload.data,
        status: action.payload.status,
        message: action.payload.message,
      }))
      .addCase(signIn.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload.message,
      }))
      .addCase(getUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload.data,
        status: action.payload.status,
        message: action.payload.message,
        error: action.payload.error,
      }))
      .addCase(getUser.rejected, (state) => ({
        ...state,
        status: 'failed',
        error: 'Network Error',
      }));
  },
});

export default authSlice.reducer;
