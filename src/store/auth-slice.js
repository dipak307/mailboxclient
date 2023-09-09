import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = { isLoggedIn: false, token: null, email: null };
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.email = action.payload.email;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },

    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;

      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = auth.actions;

export default auth.reducer;
