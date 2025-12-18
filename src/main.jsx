import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./Router/router.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={2000} />
    </AuthProvider>
  </HelmetProvider>
);
