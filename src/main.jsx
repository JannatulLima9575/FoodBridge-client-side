import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/Router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StripeProvider from "./Pages/Dashboard/Payments/StripeProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <StripeProvider>
          <RouterProvider router={router} />
        </StripeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);