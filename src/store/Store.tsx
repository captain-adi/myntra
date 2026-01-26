import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth/AuthSlice";
import BagReducer from "./bag/BagSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    bag: BagReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
