import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ciudadesData: [],
};
export const ciudadesSlice = createSlice({
  name: "ciudadesData",
  initialState,
  reducers: {
    onInitial: (state, action) => {
      state.ciudadesData = action.payload;
    },
  },
});

export const { onInitial } = ciudadesSlice.actions;
export default ciudadesSlice.reducer;
