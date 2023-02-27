import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './redux/loginSlice';
import signUpSlice from './redux/signUpSlice';

const store = configureStore({
  reducer: {
    user: loginSlice, signUpSlice,
    // reservation: reservationReducer,
  },
});

export default store;
