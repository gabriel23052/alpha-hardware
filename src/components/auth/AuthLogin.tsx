import { Link, useNavigate } from "react-router";

import AuthFormWrapper from "./AuthFormWrapper";
import Alert from "@components/ui/Alert";

import usePageTitle from "@hooks/usePageTitle";
import useFakeAPI from "@hooks/useFakeAPI";
import { useAppForm } from "@hooks/useAppForm";

import { fieldValidators } from "@utils/fieldValidators";
import { session } from "@features/session";
import { favorites } from "@features/favorites";
import { toasts } from "@features/toasts";

import classes from "./AuthLogin.module.css";

const AuthLogin = () => {
  usePageTitle("Alpha Hardware | Login");

  const navigate = useNavigate();

  const api = useFakeAPI<IUser>("POST api/auth/login");

  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const response = await api.fetch(value);
      if (!response.success || !response.data) return;
      session.start(response.data);
      favorites.requestAllFromUser();
      toasts.emit("Login efetuado com sucesso", "success");
      navigate("/");
    },
  });

  return (
    <AuthFormWrapper title="Entre na sua conta">
      <form.AppForm>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className={classes.inputs}>
            <form.AppField
              name="username"
              validators={{
                onChange: ({ value }) => fieldValidators.username(value),
                onMount: ({ value }) => fieldValidators.username(value),
              }}
              children={(field) => (
                <field.FieldText label="Nome de usuário" maxLength={30} />
              )}
            />
            <form.AppField
              name="password"
              validators={{
                onChange: ({ value }) => fieldValidators.password(value),
                onMount: ({ value }) => fieldValidators.password(value),
              }}
              children={(field) => (
                <field.FieldPassword label="Senha" maxLength={4} />
              )}
            />
          </div>
          {api.error && (
            <Alert className={classes.alert}>{api.error.message}</Alert>
          )}
          <form.SubmitButton className={classes.submitBtn}>
            Entrar
          </form.SubmitButton>
        </form>
      </form.AppForm>
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
