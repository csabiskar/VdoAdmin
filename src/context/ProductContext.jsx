import { createContext, useContext, useState } from "react";
import {
  addProducts,
  addProductImages,
  getProducts,
  getSingleProduct,
  deleteProduct,
} from "../api/product.api";
import API from "../api/axiosInstance";

const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const addProduct = async (data) => {
    try {
      setLoading(true);
      const res = await addProducts(data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addproductImage = async (data) => {
    try {
      setLoading(true);
      const res = await addProductImages(data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setCategoryData(res.products);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    const res = await API.get(`/products/${id}`);
    return res.data.product;
  };

  const removeProduct = async (id) => {
    try {
      setLoading(true);
      const res = await deleteProduct(id);
      // Remove from local state immediately
      setCategoryData((prev) => prev.filter((p) => p._id !== id));
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        addProduct,
        addproductImage,
        getSingleProduct,
        getProductById,
        removeProduct,
        loading,
        getAllProducts,
        categoryData,
        setCategoryData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
