import { configureStore } from '@reduxjs/toolkit';

import panelReducer from './panelSlice';

export const store = configureStore(
  {
  reducer: {
    panel: panelReducer,
  },
});
