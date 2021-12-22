import { createSlice } from '@reduxjs/toolkit';
const messages = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    messagesLoad: (state, action) => {
      return action.payload;
    },
  },
});

export const { actions: messagesActions, reducer: messagesReducer } = messages;
