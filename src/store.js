/*
Create store for Global State.
*/

import { configureStore } from '@reduxjs/toolkit';
import universeReducer from './redux/slices/universeSlice';

const store = configureStore({
  reducer: {
    universe: universeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

