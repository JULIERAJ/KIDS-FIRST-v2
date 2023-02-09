import { configureStore } from '@reduxjs/toolkit';

import panelReducer from './rootSlice';

export const store = configureStore({
  reducer: {
    root: panelReducer,
  },
});
