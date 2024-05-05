import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: null,
    // role: null,
    // id: null,
  }

export const registerSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    registerAction: (state, action) => {
      const {token, user} = action.payload;
      state.token = token;
      state.user = user;
    }
  },
});

export const { registerAction } = registerSlice.actions;

export default registerSlice.reducer;
