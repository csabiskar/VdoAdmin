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

export const getProducts = async (params = {}) => {
  try {
    const res = await API.get("/products", { params });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleProduct = async (id) => {
  try {
    const res = await API.get(`/products`, {
      params: id ? { categoryId: id } : {},
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editProduct = async (id,data) => {
  try {
    const res = await API.put(`/products/${id}`,data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await API.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
