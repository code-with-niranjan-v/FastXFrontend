import axios from "axios";
import { BASE_URL } from "../config/apiConfig";
export async function getOperatorBookings() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/operator/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export const getAllBuses = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${BASE_URL}/api/operator/bus`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const addBus = async (busData) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${BASE_URL}/api/operator/bus`,
      busData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const updateBus = async (id, busData) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(
      `${BASE_URL}/api/operator/bus/${id}`,
      busData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const deleteBus = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(
      `${BASE_URL}/api/operator/bus/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res.data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};
