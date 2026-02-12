import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AddProduct from "../pages/products/AddProduct";
import ProductManager from "../ProductManager";

export default function AppRouter() {
  return (
    <Routes>
    <Route path="/product" element={<ProductManager/>}/>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/products/add" />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Route>
    </Routes>
  );
}
