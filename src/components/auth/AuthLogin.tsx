import { Link } from "react-router";

import AuthFormWrapper from "./AuthFormWrapper";
import InputDefault from "@components/inputs/InputDefault";
import InputPassword from "@components/inputs/InputPassword";
import PrimaryButton from "@components/ui/PrimaryButton";

import useJafh from "@hooks/useJafh";

import FieldValidations from "@utils/FieldValidations";

import classes from "./AuthLogin.module.css";

const AuthLogin = () => {
  const loginForm = useJafh(
    {
      username: { value: "", validation: FieldValidations.username },
      password: { value: "", validation: FieldValidations.password },
    },
    "Erro na validação, tente novamente",
  );

  return (
    <AuthFormWrapper title="Entre na sua conta">
      <form>
        <div className={`${classes.inputs}`}>
          <InputDefault
            label="Nome de usuário"
            id="username"
            field={loginForm.fields.username}
            updateField={loginForm.updateField}
          />
          <InputPassword
            label="Senha"
            id="password"
            field={loginForm.fields.password}
            updateField={loginForm.updateField}
          />
        </div>
        <PrimaryButton className={`${classes.submitBtn}`}>entrar</PrimaryButton>
      </form>
      <p className={`dneutral text-small ${classes.loginLink}`}>
        Não possuí uma conta? Crie{" "}
        <Link className="secondary-xdark" to="/auth/register">
          aqui
        </Link>
      </p>
      <Link
        className={`dneutral text-default ${classes.recoverLink}`}
        to={"/auth/recover"}
      >
        Esqueci minha senha
      </Link>
    </AuthFormWrapper>
  );
};

export default AuthLogin;
