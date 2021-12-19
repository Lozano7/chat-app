import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/usersSlide';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
