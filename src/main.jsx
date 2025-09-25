import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App.jsx";
import Form from "./page/Form.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
