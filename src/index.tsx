import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Frame } from "./screens/Frame";

import "./assets/fonts/fonts.css";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Frame />
    </BrowserRouter>
  </StrictMode>,
);
