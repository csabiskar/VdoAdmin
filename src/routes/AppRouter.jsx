import { Routes, Route, Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import AddProduct from "../pages/products/AddProduct";
import ProductManager from "../ProductManager";
import Categories from "../pages/categories/Categories";
import Deals from "../pages/deals/Deals";
import Blogs from "../pages/blogs/Blogs";
import Orders from "../pages/orders/Orders";
import CreateBlog from "../pages/blogs/createblogs";

export const  AppRouter =createBrowserRouter([
{
    path:'/',
    element:<MainLayout/>,
    errorElement:<p>page not found...</p>,
    children:[
        {index:true,element:<AddProduct/>},
        {path:"/categories",element:<Categories/>},
        {path:"/deals",element:<Deals/>},
        {path:"/blogs",element:<Blogs/>},    
        {path:"/blogs/createblog",element:<CreateBlog/>},
        { path: "/blogs/edit/:id", element: <CreateBlog /> },    
        {path:"/product",element:<ProductManager/>},
        {path:"/orders",element:<Orders/>},        

    ]
}

])
