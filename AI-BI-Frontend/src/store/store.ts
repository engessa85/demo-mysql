import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import changeNameReducer from "./features/changeNameSlice"
import authReducer from "./features/authSlice"
import themeReducer from "./features/themeSlice"

export const store = configureStore({

  reducer:{
    counter: counterReducer,
    changeName:changeNameReducer,
    auth:authReducer,
    theme:themeReducer
  }

})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;