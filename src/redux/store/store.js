import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../slices/notificationSlice";
import userReducer from "../slices/userSlice";
import operatorBookingReducer from "../slices/operatorBookingSlice";
import operatorBusReducer from "../slices/operatorBusSlice";
import routeReducer from "../slices/routeSlice";
import adminUserReducer from "../slices/adminUserSlice.js";

import adminBookingReducer from "../slices/adminBookingSlice.js";

import adminBusReducer from "../slices/adminBusSlice.js";
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    operatorBookings: operatorBookingReducer,
    operatorBuses: operatorBusReducer,
    routes: routeReducer,
    adminUsers: adminUserReducer,

    adminBookings: adminBookingReducer,

    adminBuses: adminBusReducer,
  },
});
