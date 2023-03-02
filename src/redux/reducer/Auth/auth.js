import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://127.0.0.1:3000/api/v1/';
const initialState = {
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
  if (response.ok) {
    localStorage.setItem('token', response.headers.get('Authorization'));
    return response.json();
  }
  const data = await response.json();
  return data;
});

export const signIn = createAsyncThunk(LOGIN, async (user) => {
  const response = await fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  if (response.ok) {
    localStorage.setItem('token', response.headers.get('Authorization'));
    return response.json();
  }
  const data = await response.json();
  return data;
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



export default authSlice.reducer;
