import { type FocusEvent } from "react";
import { Link } from "react-router";

import AuthFormWrapper from "./AuthFormWrapper";
import InputPassword from "@components/inputs/InputPassword";
import InputDefault from "@components/inputs/InputDefault";
import PrimaryButton from "@components/ui/PrimaryButton";
import Alert from "@components/ui/Alert";

import useJafh from "@hooks/useJafh";
import usePasswordMatcher from "@hooks/usePasswordMatcher";

import FieldValidations from "@utils/FieldValidations";

import classes from "./AuthRegister.module.css";

const AuthRegister = () => {
  const registerForm = useJafh(
    {
      username: { value: "", validation: FieldValidations.username },
      email: { value: "", validation: FieldValidations.email },
      password: { value: "", validation: FieldValidations.password },
      confirmation: {
        value: "",
        validation: FieldValidations.password,
      },
    },
    "Erro na validação, tente novamente",
  );

  const passwordMatcher = usePasswordMatcher(
    registerForm.fields.password.value,
    registerForm.fields.confirmation.value,
  );

  const handlePasswordsBlur = (e: FocusEvent<HTMLInputElement>) => {
    passwordMatcher.blurField(
      e.target.id === "password" ? "password" : "confirmation",
    );
  };

  return (
    <AuthFormWrapper title="Crie sua conta">
      <form>
        <div className={classes.inputs}>
          <InputDefault
            containerClassName={classes.input}
            label="Nome de usuário"
            id="username"
            maxLength={30}
            field={registerForm.fields.username}
            updateField={registerForm.updateField}
          />
          <InputDefault
            containerClassName={classes.input}
            label="E-mail"
            id="email"
            type="email"
            maxLength={255}
            field={registerForm.fields.email}
            updateField={registerForm.updateField}
          />
          <InputPassword
            containerClassName={classes.input}
            label="Senha"
            id="password"
            maxLength={64}
            blurCallback={handlePasswordsBlur}
            field={registerForm.fields.password}
            updateField={registerForm.updateField}
          />
          <InputPassword
            containerClassName={classes.input}
            label="Confirme sua senha"
            id="confirmation"
            maxLength={64}
            blurCallback={handlePasswordsBlur}
            field={registerForm.fields.confirmation}
            updateField={registerForm.updateField}
          />
        </div>
        {passwordMatcher.showError && (
          <Alert className={classes.passwordAlert}>
            As senhas são diferentes
          </Alert>
        )}
        <PrimaryButton className={classes.submitBtn}>criar conta</PrimaryButton>
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
