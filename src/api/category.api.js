import API from "./axiosInstance";

export const getCategory = async () => {
  try {
    const res = await API.get("/category");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsForCategory = async (categoryId) =>{
  try {
    const res = await API.get("/products?limit=1000")
     return res.data;
  } catch (error) {
      console.log(error);
    throw new Error({message:error.message})
  }
}