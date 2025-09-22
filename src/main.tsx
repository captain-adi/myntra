import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { BagContextProvider } from "./context/BagContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BagContextProvider>
          <RouterProvider router={router} />
        </BagContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
