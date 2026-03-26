import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import AddProduct from "../pages/products/AddProduct";
import ProductManager from "../ProductManager";
import Categories from "../pages/categories/Categories";
import Deals from "../pages/deals/Deals";
import Blogs from "../pages/blogs/Blogs";
import Orders from "../pages/orders/Orders";
import CreateBlog from "../pages/blogs/createblogs";
import UserBlogListing from "../pages/user-blogs/UserBlogListing";
import UserBlogDetail from "../pages/user-blogs/UserBlogDetail";
import Login from "../components/Login";
import ProtectedRoute from "./ProtectedRoute";
import EditProduct from "../pages/products/EditProduct";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <p>page not found...</p>,
    children: [
      { index: true, element: <AddProduct /> },
      { path: "categories", element: <Categories /> },
      { path: "deals", element: <Deals /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/createblog", element: <CreateBlog /> },
      { path: "blogs/edit/:id", element: <CreateBlog /> },
      { path: "product", element: <ProductManager /> },
      { path: "orders", element: <Orders /> },
      { path: "products/edit/:id", element: <EditProduct /> },
    ],
  },
  {
    path: "user-blogs",
    element: <UserBlogListing />,
  },
  {
    path: "user-blogs/:id",
    element: <UserBlogDetail />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
