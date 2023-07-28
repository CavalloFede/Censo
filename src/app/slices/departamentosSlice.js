import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  departamentosData: [],
};
export const departamentosSlice = createSlice({
  name: "departamentosData",
  initialState,
  reducers: {
    onInitial: (state, action) => {
      state.departamentosData = action.payload;
    },
  },
});

export const { onInitial } = departamentosSlice.actions;
export default departamentosSlice.reducer;
