import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-blue-600 font-mono">Vite + React</h1>
    </div>
  </StrictMode>,
);
