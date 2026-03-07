import API from "./axiosInstance";

export const addProducts = async (data) => {
  try {
    const res = await API.post("/products", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const addProductImages = async (file) => {
  try {
    const formData = new FormData();

    // field name must match backend
    formData.append("image", file);

    const res = await API.post("/products/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response?.data || error);
    throw error;
  }
};
