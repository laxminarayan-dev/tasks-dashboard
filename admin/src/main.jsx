import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <TaskProvider>
        <Root />
      </TaskProvider>
    </BrowserRouter>
  </StrictMode>,
);
