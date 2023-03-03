import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './redux/loginSlice';
import signUpSlice from './redux/signUpSlice';
import roomsReducer from './redux/roomSlice';

const store = configureStore({
  reducer: {
    loginSlice,
    signUpSlice,
    rooms: roomsReducer,
    // reservation: reservationReducer,
  },
});

export default store;
