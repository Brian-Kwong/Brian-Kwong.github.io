import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { ViteReactSSG } from "vite-react-ssg/single-page";

export const createRoot = ViteReactSSG(
    <StrictMode>
        <App />
    </StrictMode>
);
