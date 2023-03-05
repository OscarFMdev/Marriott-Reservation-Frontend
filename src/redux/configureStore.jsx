import { configureStore } from '@reduxjs/toolkit';

import auth, { getUser } from './reducer/Auth/auth';
import reservationReducer from './reducer/reservation/reservationSlice';
import roomsReducer from './reducer/Rooms/roomSlice';

const store = configureStore({
  reducer: {
    auth,
    rooms: roomsReducer,
    reservations: reservationReducer,
  },
});

store.dispatch(getUser());
export default store;
