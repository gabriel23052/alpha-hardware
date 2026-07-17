import type { FormEventHandler } from "react";
import { Link, useNavigate } from "react-router";

import AuthFormWrapper from "./AuthFormWrapper";
import InputDefault from "@components/inputs/InputDefault";
import InputPassword from "@components/inputs/InputPassword";
import FormButton from "@components/ui/FormButton";
import Alert from "@components/ui/Alert";

import usePageTitle from "@hooks/usePageTitle";
import useJafh from "@hooks/useJafh";
import useFakeAPI from "@hooks/useFakeAPI";
import { useSessionStore } from "@stores/useSessionStore";

import fieldValidations from "@utils/fieldValidations";

import classes from "./AuthLogin.module.css";
import { toastHandler } from "@utils/toastHandler";

const AuthLogin = () => {
  usePageTitle("Alpha Hardware | Login");

  const navigate = useNavigate();
  const sessionStore = useSessionStore();

  const loginForm = useJafh(
    {
      username: { value: "", validation: fieldValidations.username },
      password: { value: "", validation: fieldValidations.password },
    },
    "Erro na validação, tente novamente",
  );

  const api = useFakeAPI<IUser>("POST api/auth/login");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await api.fetch({
      username: loginForm.fields.username.value.trim(),
      password: loginForm.fields.password.value.trim(),
    });
    if (!response.success || !response.data) return;
    sessionStore.login({
      id: response.data.id,
      username: response.data.username,
    });
    toastHandler.success("Login efetuado com sucesso");
    navigate("/");
  };

  return (
    <AuthFormWrapper title="Entre na sua conta">
      <form onSubmit={handleSubmit}>
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
            maxLength={4}
          />
        </div>
        {api.error && (
          <Alert className={classes.alert}>{api.error.message}</Alert>
        )}
        <FormButton
          className={classes.submitBtn}
          state={
            api.loading ? "loading" : !loginForm.isValid ? "disable" : "enable"
          }
        >
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
