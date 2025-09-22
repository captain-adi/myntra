import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
