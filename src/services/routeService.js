import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

export const addRoute = async (routeData) => {
  try {
    routeData.daily = true;
    const token = localStorage.getItem("token");
    const res = await axios.post(`${BASE_URL}/api/route`, routeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

export const getAllRoutes = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${BASE_URL}/api/route/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    console.log(e.response.data);
    return e.response;
  }
};

export const deleteRoute = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.delete(`${BASE_URL}/api/route/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const updateRouteData = async (id, routeData) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.put(
      `${BASE_URL}/api/route/${id}`,
      routeData,
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
