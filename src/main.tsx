import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./main.css";

import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./pages/Index";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
