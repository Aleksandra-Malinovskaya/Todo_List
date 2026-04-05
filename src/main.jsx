import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./RTK/store";
import { RegistrationForm } from "./RegistrationForm";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthForm } from "./AuthForm";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Todo_List">
    <Provider store={store}>
      <Routes>
        <Route path={"/"} element={<RegistrationForm />} />
        <Route path={"/auth"} element={<AuthForm />} />
        <Route path={"/todo"} element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
