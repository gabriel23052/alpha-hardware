import {
  useRef,
  type FocusEvent,
  type FormEventHandler,
} from "react";
import { Link, useNavigate } from "react-router";

import AuthFormWrapper from "./AuthFormWrapper";
import InputPassword from "@components/inputs/InputPassword";
import InputDefault from "@components/inputs/InputDefault";
import FormButton from "@components/ui/FormButton";
import Alert from "@components/ui/Alert";

import usePageTitle from "@hooks/usePageTitle";
import useJafh from "@hooks/useJafh";
import usePasswordMatcher from "@hooks/usePasswordMatcher";
import useFakeAPI from "@hooks/useFakeAPI";

import FieldValidations from "@utils/FieldValidations";

import classes from "./AuthRegister.module.css";

const AuthRegister = () => {
  const lastUserAlreadyRegistred = useRef<string | null>(null);
  const navigate = useNavigate();
  
  usePageTitle("Alpha Hardware | Cadastrar-se");

  const registerForm = useJafh(
    {
      username: { value: "", validation: FieldValidations.username },
      password: { value: "", validation: FieldValidations.password },
      confirmation: {
        value: "",
        validation: FieldValidations.password,
      },
    },
    "Erro na validação, tente novamente",
  );

  const api = useFakeAPI<FAUser>("POST api/users");

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
      username: registerForm.fields.username.value,
      password: registerForm.fields.password.value,
    });
    if (response.success) {
      navigate("/");
      console.log(response.data);
      return;
    }
    if (response.error.message === "Esse usuário já está cadastrado") {
      lastUserAlreadyRegistred.current = registerForm.fields.username.value;
    }
  };

  return (
    <AuthFormWrapper title="Crie sua conta">
      <form onSubmit={handleSubmit}>
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
          <Alert className={classes.passwordAlert}>
            As senhas são diferentes
          </Alert>
        )}
        {api.error &&
          api.error === "Esse usuário já está cadastrado" &&
          isUserAlreadyRegistred && (
            <Alert className={classes.passwordAlert}>{api.error}</Alert>
          )}
        {api.error && api.error !== "Esse usuário já está cadastrado" && (
          <Alert className={classes.passwordAlert}>{api.error}</Alert>
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
