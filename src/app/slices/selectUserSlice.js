import { createSlice } from '@reduxjs/toolkit';
const userSelected = createSlice({
  name: 'userSelected',
  initialState: null,
  reducers: {
    userSelected: (state, action) => {
      return action.payload;
    },
  },
});

export const { actions: userSelectedActions, reducer: userSelectedReducer } =
  userSelected;
