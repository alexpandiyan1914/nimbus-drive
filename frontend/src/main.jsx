import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { DriveProvider } from "./context/DriveContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DriveProvider>
        <App />
      </DriveProvider>
    </BrowserRouter>
  </React.StrictMode>
);