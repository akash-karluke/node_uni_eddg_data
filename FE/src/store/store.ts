import interceptor from "@/components/api/Apibase.interceptor";
import filterReducer from "@/reducers/filters/filterSlice";
import logBookTableReducer from "@/reducers/logBookTable/logBookTableSlice";
import oosModalReducer from "@/reducers/oosTable/oosModalSlice";
import oosTableReducer from "@/reducers/oosTable/oosTableSlice";
import picosModalReducer from "@/reducers/picosTable/picosModalSlice";
import picosTableReducer from "@/reducers/picosTable/picosTableSlice";
import ScoreCardReducer from "@/reducers/scoreCard/scoreCardSlice";
import settingsReducer from "@/reducers/userSettings/settings";
import userReducer from "@/reducers/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  filters: filterReducer,
  oosTable: oosTableReducer,
  oosModal: oosModalReducer,
  logBookTable: logBookTableReducer,
  picosTable: picosTableReducer,
  picosModal: picosModalReducer,
  scoreCard: ScoreCardReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "settings"], // Blank array means nothing persis
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

interceptor(store);

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
