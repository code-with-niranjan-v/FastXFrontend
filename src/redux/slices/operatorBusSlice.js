import { createSlice } from "@reduxjs/toolkit";

const operatorBusSlice = createSlice({
  name: "operatorBuses",
  initialState: {
    buses: [],
  },
  reducers: {
    setAllBuses: (state, action) => {
      state.buses = action.payload;
    },
    addBusRedux: (state, action) => {
      state.buses.push(action.payload);
    },

    updateBusRedux: (state, action) => {
      state.buses = state.buses.map((bus) =>
        bus.busId === action.payload.busId ? action.payload : bus,
      );
    },
    deleteBusRedux: (state, action) => {
      state.buses = state.buses.filter((bus) => bus.busId !== action.payload);
    },
  },
});

export const {
  setAllBuses,
  addBusRedux,

  updateBusRedux,
  deleteBusRedux,
} = operatorBusSlice.actions;

export default operatorBusSlice.reducer;
