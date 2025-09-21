// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Tipagem para hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
