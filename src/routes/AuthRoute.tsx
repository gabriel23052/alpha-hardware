import { Route, Routes } from "react-router";

import RegisterRoute from "./RegisterRoute";
import LoginRoute from "./LoginRoute";
import RecoverRoute from "./RecoverRoute";

import classes from "./AuthRoute.module.css";

import loginImg from "../assets/img/login.jpg";

const AuthRoute = () => {
  return (
    <main className={`defaultContainer ${classes.container}`}>
      <img src={loginImg} alt="Gamer Woman" width={683} height={604} />
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route path="/recover" element={<RecoverRoute />} />
      </Routes>
    </main>
  );
};

export default AuthRoute;
