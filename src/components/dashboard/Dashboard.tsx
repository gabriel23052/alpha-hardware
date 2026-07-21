import { NavLink, Route, Routes } from "react-router";

import ProtectedRoute from "@components/ProtectedRoute";
import DashboardOrders from "./DashboardOrders";
import DashboardCart from "./DashboardCart";
import DashboardFavorites from "./DashboardFavorites";
import DashboardAccount from "./DashboardAccount";

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
          <Route path="/" element={<DashboardOrders />} />
          <Route path="/orders" element={<DashboardOrders />} />
          <Route path="/cart" element={<DashboardCart />} />
          <Route path="/favorites" element={<DashboardFavorites />} />
          <Route path="/account" element={<DashboardAccount />} />
        </Routes>
      </main>
    </ProtectedRoute>
  );
};

export default Dashboard;

