import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: [],
};

const routeSlice = createSlice({
  name: "routes",

  initialState,

  reducers: {
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },

    addRouteRedux: (state, action) => {
      state.routes.unshift(action.payload);
    },

    updateRoute: (state, action) => {
      state.routes = state.routes.map((route) =>
        route.routeId === action.payload.routeId ? action.payload : route,
      );
    },

    deleteRoute: (state, action) => {
      state.routes = state.routes.filter(
        (route) => route.routeId !== action.payload,
      );
    },
  },
});

export const { setRoutes, addRouteRedux, updateRoute, deleteRoute } =
  routeSlice.actions;

export default routeSlice.reducer;
