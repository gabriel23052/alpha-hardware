import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./main.css";

import Header from "@components/header/Header";
import Footer from "@components/Footer";
import Home from "@components/home/Home";
import ProductPage from "@components/product/ProductPage";
import Catalog from "@components/catalog/Catalog";
import ScrollToTop from "@components/ui/ScrollToTop";
import Auth from "@components/auth/Auth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  </StrictMode>,
);
