import { configureStore } from "@reduxjs/toolkit";
import battleTurns from "./slices/battleTurns";

export const store = configureStore({
  reducer: { battleTurns },
});
