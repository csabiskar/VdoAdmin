import API from "./axiosInstance";

// GET ALL ORDERS (admin only)
export const getAllOrders = async (params = {}) => {
  try {
    const res = await API.get("/orders", { params });
    return res.data;
  } catch (error) {
    console.error("Fetch All Orders Error:", error.response?.data || error);
    throw error;
  }
};

// GET SINGLE ORDER
export const getSingleOrder = async (id) => {
  try {
    const res = await API.get(`/orders/${id}`);
    return res.data;
  } catch (error) {
    console.error("Fetch Single Order Error:", error.response?.data || error);
    throw error;
  }
};

// UPDATE ORDER STATUS (admin only)
export const updateOrderStatus = async (id, orderStatus) => {
  try {
    const res = await API.patch(`/orders/${id}/status`, { orderStatus });
    return res.data;
  } catch (error) {
    console.error("Update Order Status Error:", error.response?.data || error);
    throw error;
  }
};

export const ORDER_STATUS_OPTIONS = [
  "Out for delivery",
  "Shipped",
  "Returned",
];