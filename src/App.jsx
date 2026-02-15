import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { ProductContextProvider } from "./context/ProductContext";

export default function App() {
  return (
    <ProductContextProvider>
      <RouterProvider router={AppRouter} />
    </ProductContextProvider>
  );
}
