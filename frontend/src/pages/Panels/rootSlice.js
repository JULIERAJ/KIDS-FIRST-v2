import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    PanelStage: 1, // default page Panel to show on page load
    ParentPanel: '',
    CoParentPanel: '',
    KidPanel: '',
  },
  reducers: {
    panelStage: (state, action) => {
      state.PanelStage = action.payload;
    },
    parentPanel: (state, action) => {
      state.ParentPanel = action.payload;
    },
    coParentPanel: (state, action) => {
      state.CoParentPanel = action.payload;
    },
    kidPanel: (state, action) => {
      state.KidPanel = action.payload;
    },
  },
});

export const { panelStage, parentPanel, coParentPanel, kidPanel } =
  rootSlice.actions;
export const reducer = rootSlice.reducer;
