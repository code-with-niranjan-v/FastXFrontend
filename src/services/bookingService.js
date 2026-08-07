import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

export async function bookTicket(
  busId,

  seatNumbers,

  journeyDate,
) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/bookings`,

      {
        busId,

        seatNumbers,

        journeyDate,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response);

    return response.data;
  } catch (e) {
    console.log(e);

    return e.response.data;
  }
}

export async function getBookings() {
  const response = await axios.get(`${BASE_URL}/api/user/bookings`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data.data;
}

export const cancelBooking = async (bookingId) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.delete(
      `${BASE_URL}/api/user/booking/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const getBookedSeats = async (
  busId,

  date,
) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${BASE_URL}/api/seats/booked-seats/${busId}?date=${date}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (e) {
    return e.response.data;
  }
};
