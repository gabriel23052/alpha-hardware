import { Route, Routes } from "react-router";

import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import RecoverForm from "./RecoverForm";
import LoggedOutRoute from "@components/LoggedOutRoute";

import classes from "./Auth.module.css";

import loginImg from "../../assets/img/login.jpg";

const Auth = () => {
  return (
    <LoggedOutRoute redirectTo="/">
      <main className={`defaultContainer ${classes.container}`}>
        <img src={loginImg} alt="Gamer Woman" width={683} height={604} />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/recover" element={<RecoverForm />} />
        </Routes>
      </main>
    </LoggedOutRoute>
  );
};

export default Auth;
