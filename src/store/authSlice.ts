import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, payload) => {
      console.log(state, payload);
    },
    logout: (state, payload) => {
      console.log(state, payload);
    },
    checkingCredencials: (state) => {
      state.status = "checking";
    },
  },
});

// Action creators are generated for each case reducer functio
export const { login, logout, checkingCredencials } = authSlice.actions;

export default authSlice.reducer