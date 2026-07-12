import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./main.css";

import Header from "@components/header/Header";
import Footer from "@components/Footer";
import Home from "@components/home/Home";
import ProductPage from "@components/product/ProductPage";
import Catalog from "@components/catalog/Catalog";
import SessionValidator from "@components/SessionValidator";
import ScrollToTop from "@components/ui/ScrollToTop";
import Auth from "@components/auth/Auth";
import InstitutionalAbout from "@components/institutional/InstitutionalAbout";
import InstitutionalPrivacy from "@components/institutional/InstitutionalPrivacy";
import InstitutionalCookies from "@components/institutional/InstitutionalCookies";
import InstitutionalReturns from "@components/institutional/InstitutionalReturns";
import NotFound from "@components/NotFound";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SessionValidator />
      <ScrollToTop>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/institutional/about" element={<InstitutionalAbout />} />
          <Route
            path="/institutional/privacy"
            element={<InstitutionalPrivacy />}
          />
          <Route
            path="/institutional/cookies"
            element={<InstitutionalCookies />}
          />
          <Route
            path="/institutional/returns"
            element={<InstitutionalReturns />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  </StrictMode>,
);
