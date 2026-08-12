import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./header/Header";
import SessionValidator from "./SessionValidator";
import ScrollToTop from "./ui/ScrollToTop";
import Home from "./homepage/Homepage";
import Page from "./product/Page";
import Catalog from "./catalog/Catalog";
import Auth from "./auth/Auth";
import Dashboard from "./dashboard/Dashboard";
import About from "./institutional/About";
import Privacy from "./institutional/Privacy";
import Cookies from "./institutional/Cookies";
import Returns from "./institutional/Returns";
import NotFound from "./NotFound";
import Footer from "./Footer";
import Toasts from "./toasts/Toasts";

import { useEffect } from "react";
import { favorites } from "@features/favorites";
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
          <Route path="/product/:productId" element={<Page />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/institutional/about" element={<About />} />
          <Route path="/institutional/privacy" element={<Privacy />} />
          <Route path="/institutional/cookies" element={<Cookies />} />
          <Route path="/institutional/returns" element={<Returns />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toasts />
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
