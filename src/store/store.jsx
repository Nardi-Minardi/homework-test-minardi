import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { default as rootSlice } from "./rootReducer";
import logger from "redux-logger";
import { NODE_ENV } from "../config";

export const store = configureStore({
  reducer: rootSlice,
  devTools: NODE_ENV !== "production" ? true : false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(NODE_ENV !== "production" ? logger : []),
});

export default store;