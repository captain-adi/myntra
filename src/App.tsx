import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./utils/ScrollToTop";
import { useAppDispatch } from "./hooks/hook";
import { useEffect } from "react";
import { login as checkLoginFromRedux } from "./store/auth/authThunks";
import { useFetchProducts } from "./hooks/query";
import { setProducts } from "./store/bag/BagSlice";

function App() {
  const dispatch = useAppDispatch();
  const { data } = useFetchProducts();

  useEffect(() => {
    dispatch(checkLoginFromRedux());
    if (data) {
      dispatch(setProducts(data?.data || []));
    }
  }, [dispatch, data]);

  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer />
      <Header />
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
