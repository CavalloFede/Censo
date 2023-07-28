import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userLogged: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onLogin: (state, action) => {
      state.userLogged = action.payload;
    },
    onLogout: (state) => {},
  },
});

export const { onLogin, onLogout } = userSlice.actions;
export default userSlice.reducer;
