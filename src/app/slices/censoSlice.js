import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  censoData: [],
};
export const censoSlice = createSlice({
  name: "censoData",
  initialState,
  reducers: {
    onInitial: (state, action) => {
      state.censoData = action.payload;
    },
    add: (state, action) => {
      state.censoData.push(action.payload);
    },
    delete: (state, action) => {
      const idToDelete = action.payload;
      state.censoData = state.censoData.filter(
        (item) => item.id !== idToDelete
      );
    },
  },
});

export const { onInitial } = censoSlice.actions;
export default censoSlice.reducer;
