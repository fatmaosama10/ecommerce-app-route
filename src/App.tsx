import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Brands from "./components/Brands/Brands";
import Category from "./components/Category/Category";
import Error from "./components/Error/Error";
import Layout from "./components/Layout/Layout";
import Product from "./components/Product/Product";
import Wishlist from "./components/Wishlist/Wishlist";
import AuthContextProvider from "./components/Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./components/CartContext/CartContext";

import Payment from "./components/Payment/Payment";

// إنشاء التوجيهات (Routes)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: "/productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/brands", element: <Brands /> },
      { path: "/category", element: <Category /> },
      { path: "/product", element: <Product /> },
      { path: "/wishlist", element: <ProtectedRoute><Wishlist /> </ProtectedRoute> },
      { path: "/payment", element: <ProtectedRoute><Payment /> </ProtectedRoute> },
      { path: "*", element: <Error /> },
    ],
  },
]);

// إنشاء كائن `QueryClient` للاستخدام مع React Query
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartContextProvider>
            <Toaster />
            <RouterProvider router={router} />
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;


