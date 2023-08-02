import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  censados: [],
};
export const censoSlice = createSlice({
  name: "censo",
  initialState,
  reducers: {
    onInitial: (state, action) => {
      state.censados = action.payload;
    },
    onAdd: (state, action) => {
      const { payload } = action;
      state.censados = [...state.censados, payload];
    },
    onDelete: (state, action) => {
      const { payload } = action;
      const newCensados = state.censados.filter((item) => item.id !== payload);
      state.censados = newCensados;
    },
  },
});

export const { onInitial, onAdd, onDelete } = censoSlice.actions;
export default censoSlice.reducer;
