import { createSlice } from "@reduxjs/toolkit";
import {
  getItemFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/storage";

const initialState = {
  userLogged: getItemFromLocalStorage("censoUser"),
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onLogin: (state, action) => {
      state.userLogged = action.payload;
    },
    onLogout: (state) => {
      removeUserFromLocalStorage();
      state.userLogged = null;
    },
  },
});

export const { onLogin, onLogout } = userSlice.actions;
export default userSlice.reducer;
