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
