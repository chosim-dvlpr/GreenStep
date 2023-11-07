// store.ts
import {configureStore} from '@reduxjs/toolkit';
import ploggingReducer from './ploggingSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    plogging: ploggingReducer,
    user: userReducer,
  },
});
// RootState 타입을 추출합니다.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입을 추출합니다.
export type AppDispatch = typeof store.dispatch;
