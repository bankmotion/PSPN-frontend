import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import swapReducer from "./swapSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    swap: swapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
