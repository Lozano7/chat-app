import { createSlice } from '@reduxjs/toolkit';
import { actionsUser } from '../actions/authActions';

export const initialStateUsers = {
  user: {
    name: '',
    email: '',
  },
  logged: false,
};

const users = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: actionsUser,
});

export const { actions: userActions, reducer: userReducer } = users;
