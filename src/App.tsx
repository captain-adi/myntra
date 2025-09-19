import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import { AuthContextProvider } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { BagContextProvider } from "./context/BagContext";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BagContextProvider>
          <div className="flex min-h-screen flex-col">
            <ToastContainer />
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </BagContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
