import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CrackersProvider } from "./context/CrackersContext";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CrackersProvider>
        <App />
      </CrackersProvider>
    </BrowserRouter>
  </React.StrictMode>
);
