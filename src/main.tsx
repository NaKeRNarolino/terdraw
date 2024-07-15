import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToolRepository } from "./tools/singleton";

const toolRepository = Object.freeze(new ToolRepository());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
