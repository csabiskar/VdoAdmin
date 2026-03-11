import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { ProductContextProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <AuthProvider>
      <ProductContextProvider>
        <RouterProvider router={AppRouter} />
      </ProductContextProvider>
    </AuthProvider>
  );
}
