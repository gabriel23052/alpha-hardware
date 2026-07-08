import { Link } from "react-router";

import AuthFormWrapper from "./AuthFormWrapper";
import InputDefault from "@components/inputs/InputDefault";
import InputPassword from "@components/inputs/InputPassword";
import FormButton from "@components/ui/FormButton";

import usePageTitle from "@hooks/usePageTitle";
import useJafh from "@hooks/useJafh";

import FieldValidations from "@utils/FieldValidations";

import classes from "./AuthLogin.module.css";

const AuthLogin = () => {
  usePageTitle("Alpha Hardware | Login");

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
        <div className={classes.inputs}>
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
        <FormButton className={classes.submitBtn} state="enable">
          entrar
        </FormButton>
      </form>
      <p className={`text-small dneutral ${classes.loginLink}`}>
        Não possuí uma conta? Crie{" "}
        <Link className="secondary-xdark" to="/auth/register">
          aqui
        </Link>
      </p>
      <Link
        className={`text-default dneutral ${classes.recoverLink}`}
        to={"/auth/recover"}
      >
        Esqueci minha senha
      </Link>
    </AuthFormWrapper>
  );
};

export default AuthLogin;
