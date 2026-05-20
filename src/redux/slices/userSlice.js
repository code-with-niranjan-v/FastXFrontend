import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  role: "",
  token: "",
  phoneNumber: "",
  wallet: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.phoneNumber = action.payload.phoneNumber;
      state.wallet = action.payload.wallet;
    },

    logoutUser: (state) => {
      state.name = "";
      state.email = "";
      state.role = "";
      state.token = "";
      state.phoneNumber = "";
      state.wallet = "";
    },
    updateWallet: (state, action) => {
      state.wallet += action.payload;
    },
  },
});

export const { setUser, logoutUser, updateWallet } = userSlice.actions;

export default userSlice.reducer;
