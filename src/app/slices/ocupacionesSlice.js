import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ocupacionesData: [],
};
export const ocupacionesSlice = createSlice({
  name: "ocupacionesData",
  initialState,
  reducers: {
    onInitial: (state, action) => {
      state.ocupacionesData = action.payload;
    },
  },
});

export const { onInitial } = ocupacionesSlice.actions;
export default ocupacionesSlice.reducer;
