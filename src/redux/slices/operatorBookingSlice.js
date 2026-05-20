import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

const operatorBookingSlice = createSlice({
  name: "operatorBookings",

  initialState,

  reducers: {
    setOperatorBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const { setOperatorBookings } = operatorBookingSlice.actions;

export default operatorBookingSlice.reducer;
