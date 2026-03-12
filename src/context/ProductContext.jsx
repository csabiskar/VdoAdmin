import { createContext, useContext, useState } from "react";
import { addProducts, addProductImages } from "../api/product.api";

const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const addProduct = async (data) => {
    try {
      setLoading(true);
      const res = await addProducts(data);
      return res;
    } catch (error) {
      setLoading(false);
      console.log(error);
      throw error;
    }
     finally {
      setLoading(false);
    }
  };

  const addproductImage = async (data) => {
    try {
      setLoading(true);
      const res = await addProductImages(data);
      return res;
    } catch (error) {
      setLoading(false);
      console.log(error);
      throw error
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <ProductContext.Provider value={{ addProduct,addproductImage, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  return useContext(ProductContext);
};
