import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

export const getRefundRequests = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${BASE_URL}/api/operator/refund`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const approveRefund = async (refundId) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.put(
      `${BASE_URL}/api/operator/refund/approve/${refundId}`,
      {},
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

export const rejectRefund = async (refundId) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.put(
      `${BASE_URL}/api/operator/refund/reject/${refundId}`,
      {},
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
