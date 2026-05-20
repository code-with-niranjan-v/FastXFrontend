import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buses: [],
};

const adminBusSlice = createSlice({
  name: "adminBuses",

  initialState,

  reducers: {
    setAdminBuses: (state, action) => {
      state.buses = action.payload;
    },

    addAdminBus: (state, action) => {
      state.buses.push(action.payload);
    },

    removeAdminBus: (state, action) => {
      state.buses = state.buses.filter((bus) => bus.busId !== action.payload);
    },

    updateAdminBus: (state, action) => {
      state.buses = state.buses.map((bus) =>
        bus.busId === action.payload.busId ? action.payload : bus,
      );
    },
  },
});

export const { setAdminBuses, addAdminBus, removeAdminBus, updateAdminBus } =
  adminBusSlice.actions;

export default adminBusSlice.reducer;
