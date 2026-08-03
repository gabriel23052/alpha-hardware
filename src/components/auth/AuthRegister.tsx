import { useRef, type FocusEvent, type FormEventHandler } from "react";
import { Link, useNavigate } from "react-router";

import AuthFormWrapper from "./AuthFormWrapper";
import AuthNotice from "./AuthNotice";
import InputPassword from "@components/inputs/InputPassword";
import InputDefault from "@components/inputs/InputDefault";
import FormButton from "@components/ui/FormButton";
import Alert from "@components/ui/Alert";

import usePageTitle from "@hooks/usePageTitle";
import useJafh from "@hooks/useJafh";
import usePasswordMatcher from "@hooks/usePasswordMatcher";
import useFakeAPI from "@hooks/useFakeAPI";

import fieldValidations from "@utils/fieldValidations";
import { useSessionStore } from "@stores/useSessionStore";
import { toasts } from "@features/toasts";

import classes from "./AuthRegister.module.css";

const USER_ALREADY_REGISTRED_ERROR_ID = "USER_CREATION_USER_ALREADY_REGISTERED";

const AuthRegister = () => {
  const lastUserAlreadyRegistred = useRef<string | null>(null);
  const navigate = useNavigate();

  usePageTitle("Alpha Hardware | Cadastrar-se");

  const sessionStore = useSessionStore();

  const registerForm = useJafh(
    {
      username: { value: "", validation: fieldValidations.username },
      password: { value: "", validation: fieldValidations.password },
      confirmation: {
        value: "",
        validation: fieldValidations.password,
      },
    },
    "Erro na validação, tente novamente",
  );

  const api = useFakeAPI<IUser>("POST api/auth/register");

  const passwordMatcher = usePasswordMatcher(
    registerForm.fields.password.value,
    registerForm.fields.confirmation.value,
  );

  const isUserAlreadyRegistred =
    registerForm.fields.username.value === lastUserAlreadyRegistred.current;

  const handlePasswordsBlur = (e: FocusEvent<HTMLInputElement>) => {
    passwordMatcher.blurField(
      e.target.id === "password" ? "password" : "confirmation",
    );
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await api.fetch({
      username: registerForm.fields.username.value.trim(),
      password: registerForm.fields.password.value.trim(),
    });
    if (response.success && response.data) {
      sessionStore.login(response.data);
      toasts.emit("Registro efetuado com sucesso", "success");
      navigate("/");
      return;
    }
    if (
      !response.success &&
      response.error.id === USER_ALREADY_REGISTRED_ERROR_ID
    ) {
      lastUserAlreadyRegistred.current = registerForm.fields.username.value;
    }
  };

  return (
    <AuthFormWrapper title="Crie sua conta">
      <form onSubmit={handleSubmit}>
        <AuthNotice>
          Por tratar-se de uma demonstração com dados armazenados localmente, o
          sistema de autenticação é simplificado, necessitando apenas de um nome
          de usuário e uma senha númerica de 4 dígitos.
        </AuthNotice>
        <div className={classes.inputs}>
          <InputDefault
            containerClassName={classes.input}
            label="Nome de usuário"
            id="username"
            maxLength={30}
            disabled={api.loading}
            field={registerForm.fields.username}
            updateField={registerForm.updateField}
          />
          <InputPassword
            containerClassName={classes.input}
            label="Senha"
            id="password"
            maxLength={4}
            blurCallback={handlePasswordsBlur}
            disabled={api.loading}
            field={registerForm.fields.password}
            updateField={registerForm.updateField}
          />
          <InputPassword
            containerClassName={classes.input}
            label="Confirme sua senha"
            id="confirmation"
            maxLength={4}
            blurCallback={handlePasswordsBlur}
            disabled={api.loading}
            field={registerForm.fields.confirmation}
            updateField={registerForm.updateField}
          />
        </div>
        {passwordMatcher.showError && (
          <Alert className={classes.alert}>As senhas são diferentes</Alert>
        )}
        {api.error &&
          api.error.id === USER_ALREADY_REGISTRED_ERROR_ID &&
          isUserAlreadyRegistred && (
            <Alert className={classes.alert}>{api.error.message}</Alert>
          )}
        {api.error && api.error.id !== USER_ALREADY_REGISTRED_ERROR_ID && (
          <Alert className={classes.alert}>{api.error.message}</Alert>
        )}
        <FormButton
          className={classes.submitBtn}
          type="submit"
          state={
            api.loading
              ? "loading"
              : !registerForm.isValid ||
                  isUserAlreadyRegistred ||
                  !passwordMatcher.areEqual
                ? "disable"
                : "enable"
          }
        >
          criar conta
        </FormButton>
      </form>
      <p className={`text-small dneutral ${classes.loginLink}`}>
        Já possui uma conta? Faça login{" "}
        <Link className="secondary-xdark" to="/auth/login">
          aqui
        </Link>
      </p>
    </AuthFormWrapper>
  );
};

export default AuthRegister;
