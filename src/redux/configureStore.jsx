import { configureStore } from '@reduxjs/toolkit';

import auth from './reducer/Auth/auth';
import reservationReducer from './reducer/reservation/reservationSlice';
import roomsReducer, { fetchRooms } from './reducer/Rooms/roomSlice';

const store = configureStore({
  reducer: {
    auth,
    rooms: roomsReducer,
    reservations: reservationReducer,
  },
});

store.dispatch(fetchRooms());
export default store;
