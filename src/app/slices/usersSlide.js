import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { actionsUser } from '../actions/authActions';

export const initialStateUsers = {
  user: {
    name: '',
    email: '',
  },
  logged: false,
};
export const login = createAsyncThunk('users/auth', async () => {
  let userAuth;
  await onAuthStateChanged(auth, (user) => {
    userAuth = user;
  });
  return userAuth;
});

const users = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: actionsUser,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = users;
