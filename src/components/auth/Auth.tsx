import { Route, Routes } from "react-router";

import AuthRegister from "./AuthRegister";
import AuthLogin from "./AuthLogin";
import AuthRecover from "./AuthRecover";

import classes from "./Auth.module.css";

import loginImg from "../../assets/img/login.jpg";

const Auth = () => {
  return (
    <main className={`defaultContainer ${classes.container}`}>
      <img src={loginImg} alt="Gamer Woman" width={683} height={604} />
      <Routes>
        <Route path="/" element={<AuthLogin />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/recover" element={<AuthRecover />} />
      </Routes>
    </main>
  );
};

export default Auth;
