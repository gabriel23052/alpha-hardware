import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./main.css";

import Header from "@components/header/Header";
import Footer from "@components/Footer";
import IndexRoute from "./routes/IndexRoute";
import ProductRoute from "./routes/ProductRoute";
import ProductListRoute from "./routes/ProductListRoute";
import ScrollToTop from "@components/ScrollToTop";
import AuthRoute from "./routes/AuthRoute";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <Header />
        <Routes>
          <Route path="/" element={<IndexRoute />} />
          <Route path="/product/:productId" element={<ProductRoute />} />
          <Route path="/products" element={<ProductListRoute />} />
          <Route path="/auth/*" element={<AuthRoute/>} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  </StrictMode>
);
