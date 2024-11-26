import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/commonSlice";
import authSlice from "./slices/authSlice";
import createMotelSlice from "./slices/createMotelSlice";
import { motelApi } from "./api/motelApi";
import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import filterSlice from "./slices/filterSlice";
import { motelUtilApi } from "./api/motelUtilApi";
import chatSlice from "./slices/chatSlice";

const reducer = combineReducers({
  common: commonSlice,
  auth: authSlice,
  createMotel: createMotelSlice,
  chat: chatSlice,
  filter: filterSlice,
  [motelApi.reducerPath]: motelApi.reducer,
  [motelUtilApi.reducerPath]: motelUtilApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      motelUtilApi.middleware,
      motelApi.middleware,
      userApi.middleware,
      postApi.middleware,
    ]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
