// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import frameReducer from '../features/frame/frameSlice';

export const store = configureStore({
  reducer: {
    frame: frameReducer,  // <-- This registers the `frame` slice
  },
});

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
