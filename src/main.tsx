import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./main.css";

import Header from "@components/header/Header";
import Footer from "@components/Footer";
import IndexRoute from "./routes/IndexRoute";
import ProductRoute from "./routes/ProductRoute";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<IndexRoute />} />
        <Route path="/product/:productId" element={<ProductRoute />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
