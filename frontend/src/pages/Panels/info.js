import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './infoSlice';

export const info = configureStore({
  reducer,
});
