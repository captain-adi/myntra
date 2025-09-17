import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import App from "../App";
import Category from "../pages/category/Category";
import Product from "../pages/product/Product";

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
    ],
  },
]);

export default router;
