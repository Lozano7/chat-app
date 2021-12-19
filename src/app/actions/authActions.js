import { createAsyncThunk } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';

function login(state, action) {
  return {
    user: {
      name: action.payload.user.name,
      email: action.payload.user.email,
    },
    logged: action.payload.logged,
  };
}
function logout(state, action) {
  return action.payload;
}

const login2 = createAsyncThunk('users/auth', () => {
  return onAuthStateChanged(auth, (user) => {
    return user;
  });
});

export const actionsUser = {
  login,
  logout,
};
export const extraActionsUser = {
  login2,
};
