import { createSlice } from '@reduxjs/toolkit';

const infoSlice = createSlice({
  name: 'info',
  initialState: {
    firstname: 'First Name',
    lastname: 'Last Name',
    co_firstname: 'First Name',
    co_lastname: 'Last Name',
    co_email: 'Name@mail.com',
    kids_name: "Kid's Name",
  },
  reducers: {
    insertFirstName: (state, action) => {
      state.firstname = action.payload;
    },
    insertLastName: (state, action) => {
      state.lastname = action.payload;
    },
    insertCo_FirstName: (state, action) => {
      state.co_firstname = action.payload;
    },
    insertCo_LastName: (state, action) => {
      state.co_lastname = action.payload;
    },
    insertCo_Email: (state, action) => {
      state.co_email = action.payload;
    },
    insertKidsName: (state, action) => {
      state.kids_name = action.payload;
    },
  },
});

export const reducer = infoSlice.reducer;

export const {
  insertFirstName,
  insertLastName,
  insertCo_FirstName,
  insertCo_LastName,
  insertCo_Email,
  insertKidsName,
} = infoSlice.actions;
