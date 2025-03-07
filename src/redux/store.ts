import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import swapReducer from "./swapSlice";
import ufcReducer from "./ufcSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    swap: swapReducer,
    ufc: ufcReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
