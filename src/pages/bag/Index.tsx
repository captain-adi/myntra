import CheckoutHeader from "./components/CheckoutHeader";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { ToastContainer } from "react-toastify";

function BagLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer />
      <CheckoutHeader />
      <main className="flex-1 container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BagLayout;
