import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

export default router;
