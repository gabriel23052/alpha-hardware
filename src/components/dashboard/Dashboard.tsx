import { NavLink, Route, Routes } from "react-router";

import ProtectedRoute from "@components/ProtectedRoute";
import Orders from "./Orders";
import Cart from "./Cart";
import Favorites from "./Favorites";
import Account from "./Account";

import { useSessionStore } from "@stores/useSessionStore";

import { DASHBOARD_SECTIONS } from "../../config";

import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const username = useSessionStore((state) => state.user?.username);

  return (
    <ProtectedRoute redirectTo="/auth/login">
      <main className={`defaultContainer ${classes.container}`}>
        <section className={`${classes.navigationContainer}`}>
          <p className="text-large dneutral-light">Olá {username || ""}!</p>
          <nav>
            <ul>
              {DASHBOARD_SECTIONS.map((ds) => (
                <li className={classes.listItem} key={ds.name}>
                  <NavLink
                    className={({ isActive }) =>
                      `text-default-b dneutral ${isActive ? classes.active : ""}`
                    }
                    to={`/dashboard/${ds.name}`}
                  >
                    <ds.Icon width={24} height={24} aria-hidden="true" />
                    {ds.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </section>
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </ProtectedRoute>
  );
};

export default Dashboard;

