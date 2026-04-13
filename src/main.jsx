import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RegistrationForm } from "./RegistrationForm";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthForm } from "./AuthForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/Todo_List">
        <Routes>
          <Route path={"/"} element={<RegistrationForm />} />
          <Route path={"/auth"} element={<AuthForm />} />
          <Route path={"/todo"} element={<App />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
