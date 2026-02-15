import { createContext, useContext, useState } from "react";
import { addProducts } from "../api/product.api";

const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const addProduct = async (data) => {
    try {
      setLoading(true);
      const res = await addProduct(data);
      return res;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider value={{ addProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  return useContext(ProductContext);
};
