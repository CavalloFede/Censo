import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import departamentosSlice from "./slices/departamentosSlice";
import ciudadesSlice from "./slices/ciudadesSlice";
import ocupacionesSlice from "./slices/ocupacionesSlice";
import censoSlice from "./slices/censoSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    departamentos: departamentosSlice,
    ciudades: ciudadesSlice,
    ocupaciones: ocupacionesSlice,
    censo: censoSlice,
  },
});
