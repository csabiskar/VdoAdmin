import API from "./axiosInstance";

export const getCategory = async () => {
  try {
    const res = await API.get("/category");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};