import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './storeSlice';

export const store = configureStore({
  reducer,
});
