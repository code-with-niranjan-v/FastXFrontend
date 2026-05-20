import axios from "axios";

export const addMoneyToWallet = async (amount) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.put(
      "http://localhost:8080/api/user/wallet/add",
      {
        amount,
      },
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

export const updateProfile = async (userData) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:8080/api/user/profile", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(userData),
    });

    return await res.json();
  } catch (e) {
    return {
      success: false,

      message: "Server Error",
    };
  }
};

export const updatePassword = async (passwordData) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:8080/api/user/change-password", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(passwordData),
    });

    return await res.json();
  } catch (e) {
    return {
      success: false,

      message: "Server Error",
    };
  }
};
