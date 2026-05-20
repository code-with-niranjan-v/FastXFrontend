import axios from "axios";

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get("http://localhost:8080/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const getAllBookings = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get("http://localhost:8080/api/admin/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const getAllBusesAdmin = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get("http://localhost:8080/api/admin/buses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      `http://localhost:8080/api/admin/delete-user/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return await res.json();
  } catch (e) {
    return {
      success: false,

      message: "Server Error",
    };
  }
};
