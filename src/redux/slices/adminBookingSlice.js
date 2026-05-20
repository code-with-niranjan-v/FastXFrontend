import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

const adminBookingSlice = createSlice({
  name: "adminBookings",

  initialState,

  reducers: {
    setAdminBookings: (state, action) => {
      state.bookings = action.payload;
    },

    addAdminBooking: (state, action) => {
      state.bookings.push(action.payload);
    },

    updateAdminBooking: (state, action) => {
      state.bookings = state.bookings.map((booking) =>
        booking.bookingId === action.payload.bookingId
          ? action.payload
          : booking,
      );
    },
  },
});

export const { setAdminBookings, addAdminBooking, updateAdminBooking } =
  adminBookingSlice.actions;

export default adminBookingSlice.reducer;
