import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import App from "../App";
import Category from "../pages/category/Category";
import Product from "../pages/product/Product";
import WishList from "../pages/wishList/WishList";
import Bag from "../pages/bag/Bag";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";

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
      {
        path: "/bag",
        element: (
          <ProtectedRoute>
            <Bag />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
