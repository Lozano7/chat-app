import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from './slices/messagesSlice';
import { userSelectedReducer } from './slices/selectUserSlice';
import { userReducer } from './slices/usersSlide';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userSeleted: userSelectedReducer,
    message: messagesReducer,
  },
});
