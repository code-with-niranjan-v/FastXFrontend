import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const adminUserSlice = createSlice({
  name: "adminUsers",

  initialState,

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    removeUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.userId !== action.payload,
      );
    },
  },
});

export const { setUsers, addUser, removeUser } = adminUserSlice.actions;

export default adminUserSlice.reducer;
