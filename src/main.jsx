import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LibraryProvider } from "./context/LibraryContext";
import { ThemeProvider } from "./context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LibraryProvider>
          <App />
        </LibraryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
