import { configureStore } from '@reduxjs/toolkit';

import auth from './reducer/Auth/auth';

const store = configureStore({
  reducer: {
    auth,
  },
});

export default store;
