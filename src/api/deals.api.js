import API from "./axiosInstance";

export const getDeals = async () => {
  try {
    const res = await API.get("products/isHotDeals");
    return res.data;
  } catch (error) {
    console.error("Fetch All HotDeals Error:", error.response?.data || error);
    throw error;
  }
};

export const getFeaturedDeals = async () => {
  try {
    const res = await API.get("products/isFeatured");
    return res.data;
  } catch (error) {
    console.error("Fetch Featured Deals Error:", error.response?.data || error);
    throw error;
  }
};

export const editFeaturedDeals = async (id) => {
  try {
    const res = await API.patch(`products/isFeatured/${id}`);
    return res.data;
  } catch (error) {
    console.error("Fetch Featured Deals Error:", error.response?.data || error);
    throw error;
  }
};

export const editDeals = async (id) => {
  try {
    const res = await API.patch(`products/isHotDeals/${id}`);
    return res.data;
  } catch (error) {
    console.error("Fetch All HotDeals Error:", error.response?.data || error);
    throw error;
  }
};