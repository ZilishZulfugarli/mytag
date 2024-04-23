import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    userName: null,
    role: null,
    id: null,
  }

export const registerSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    registerAction: (state, action) => {
      const {name} = action.payload;
      state.name = name
    }
  },
});

export const { registerAction } = registerSlice.actions;

export default registerSlice.reducer;
