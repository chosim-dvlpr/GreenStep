// store.ts
import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import ploggingReducer from './ploggingSlice';
import userReducer from './userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  plogging: ploggingReducer,
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: {
  //   plogging: ploggingReducer,
  //   user: userReducer,
  // },
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

// RootState 타입을 추출합니다.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입을 추출합니다.
export type AppDispatch = typeof store.dispatch;
