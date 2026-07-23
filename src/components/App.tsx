import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./header/Header";
import SessionValidator from "./SessionValidator";
import ScrollToTop from "./ui/ScrollToTop";
import Home from "./home/Home";
import ProductPage from "./product/ProductPage";
import Catalog from "./catalog/Catalog";
import Auth from "./auth/Auth";
import Dashboard from "./dashboard/Dashboard";
import InstitutionalAbout from "./institutional/InstitutionalAbout";
import InstitutionalPrivacy from "./institutional/InstitutionalPrivacy";
import InstitutionalCookies from "./institutional/InstitutionalCookies";
import InstitutionalReturns from "./institutional/InstitutionalReturns";
import NotFound from "./NotFound";
import Footer from "./Footer";
import Toasts from "./toasts/Toasts";

import { useEffect } from "react";
import { favorites } from "../features/favorites";
import { useSessionStore } from "@stores/useSessionStore";

const App = () => {
  const isLoggedIn = useSessionStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      favorites.requestAllFromUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // prettier-ignore
  return (
    <BrowserRouter>
      <SessionValidator />
      <ScrollToTop>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/institutional/about" element={<InstitutionalAbout />} />
          <Route path="/institutional/privacy" element={<InstitutionalPrivacy />} />
          <Route path="/institutional/cookies" element={<InstitutionalCookies />} />
          <Route path="/institutional/returns" element={<InstitutionalReturns />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toasts />
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
