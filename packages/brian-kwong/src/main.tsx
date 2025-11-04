import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { ViteReactSSG } from "vite-react-ssg/single-page";

if (typeof document !== 'undefined') {
  document.documentElement.lang = 'en';
}

export const createRoot = ViteReactSSG(
    <StrictMode>
        <App />
    </StrictMode>
);
