import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import registerSlice from "./slices/registerSlice";

const reducers = combineReducers({
  register: registerSlice
});

const persistConfig = {
  key: "root",
  storage:  storage,
  whitelist: ["register"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
