import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import { AuthContextProvider } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ToastContainer />
        <Header />
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
