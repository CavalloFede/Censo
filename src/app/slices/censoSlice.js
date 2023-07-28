import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  censados: [],
};
export const censoSlice = createSlice({
  name: 'censo',
  initialState,
  reducers: {
    onInitial: (state, action) => {
      state.censados = action.payload;
    },
    onAdd: (state, action) => {
      state.censados.push(action.payload);
    },
    onDelete: (state, action) => {
      const idToDelete = action.payload;
      state.censados = state.censados.filter((item) => item.id !== idToDelete);
    },
  },
});

export const { onInitial, onAdd, onDelete } = censoSlice.actions;
export default censoSlice.reducer;
