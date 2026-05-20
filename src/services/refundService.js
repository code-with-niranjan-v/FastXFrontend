import axios from "axios";

export const getRefundRequests = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get("http://localhost:8080/api/operator/refund", {
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
      `http://localhost:8080/api/operator/refund/approve/${refundId}`,
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
      `http://localhost:8080/api/operator/refund/reject/${refundId}`,
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
