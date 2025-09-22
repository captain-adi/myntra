import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import App from "../App";
import Category from "../pages/category/Category";
import Product from "../pages/product/Product";
import WishList from "../pages/wishList/WishList";
import Bag from "../pages/bag/components/Bag";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import BagLayout from "../pages/bag/Index";
import Address from "../pages/address/Address";
import Payment from "../pages/payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/category/:categoryname", element: <Category /> },
      { path: "/category/:categoryname/product/:id", element: <Product /> },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/checkout",
    element: <BagLayout />,
    children: [
      {
        path: "/checkout/bag",
        element: (
          <ProtectedRoute>
            <Bag />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout/address",
        element: <Address />,
      },
      {
        path: "/checkout/payment",
        element: <Payment />,
      },
    ],
  },
]);

export default router;
