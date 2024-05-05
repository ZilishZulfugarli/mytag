import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import registerSlice from "./slices/registerSlice";
import userPanelSlice from "./slices/userPanelSlice";

const reducers = combineReducers({
  register: registerSlice,
  userPanel: userPanelSlice
});

const persistConfig = {
  key: "root",
  storage:  storage,
  whitelist: ["register", "userPanel"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
