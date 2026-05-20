import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        title: action.payload.title,
        message: action.payload.message,
        time: action.payload.time,
        read: false,
      });
    },

    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      );

      if (notification) {
        notification.read = true;
      }
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
