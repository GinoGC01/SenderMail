import React from "react";
import ReactDOM from "react-dom/client";
import { StudiosProvider } from "./context/StudiosContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudiosProvider>
      <App />
    </StudiosProvider>
  </React.StrictMode>
);
