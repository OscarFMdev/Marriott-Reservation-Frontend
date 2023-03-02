import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './redux/loginSlice';
import signUpSlice from './redux/signUpSlice';
import roomSlice from './redux/reducer/roomSlice';

const store = configureStore({
  reducer: {
     loginSlice,
     signUpSlice,
     roomSlice
    // reservation: reservationReducer,
  },
});

export default store;
