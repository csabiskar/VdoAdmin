import API from "./axiosInstance";

export const getCategory = async () => {
  try {
    const res = await API.get("/category");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsForCategory = async (categoryId) => {
  try {
    const res = await API.get("/products?limit=1000");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error({ message: error.message });
  }
};

export const addCategory = async (data) => {
  try {
    const res = await API.post(`/category`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editCategory = async (id, data) => {
  try {
    const res = await API.put(`/category/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Upload a category image — same multipart pattern as product images
export const uploadCategoryImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await API.post("/products/image/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data; // expected: { url: "https://..." }
  } catch (error) {
    console.log(error.response?.data || error);
    throw error;
  }
};