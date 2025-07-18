import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./main.css";

import Header from "@components/header/Header";
import Index from "./pages/Index";
import Footer from "@components/Footer";

// TEST
import ProductsAPI from "./fakeAPI/ProductsAPI";
const fakeApi = new ProductsAPI();
console.log(fakeApi.getProductById("C45F042A9"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
