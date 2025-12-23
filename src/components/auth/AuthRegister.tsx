import { useEffect, useMemo, useState, type FocusEvent } from "react";
import { Link } from "react-router";

import AuthFormWrapper from "./AuthFormWrapper";
import InputPassword from "@components/inputs/InputPassword";
import InputDefault from "@components/inputs/InputDefault";
import PrimaryButton from "@components/PrimaryButton";

import useJafh from "@hooks/useJafh";

import FieldValidations from "@utils/FieldValidations";

import SVGAlert from "@svg/alert.svg?react";

import classes from "./AuthRegister.module.css";

const AuthRegister = () => {
  const [passwordsComparation, setPasswordsComparation] = useState({
    areEqual: true,
    passwordHasBlurred: false,
    confirmationHasBlurred: false,
  });

  const registerForm = useJafh(
    {
      username: { value: "", validation: FieldValidations.username },
      email: { value: "", validation: FieldValidations.email },
      password: { value: "", validation: FieldValidations.password },
      passwordConfirmation: {
        value: "",
        validation: FieldValidations.password,
      },
    },
    "Erro na validação, tente novamente"
  );

  useEffect(() => {
    setPasswordsComparation((prev) => ({
      ...prev,
      areEqual:
        registerForm.fields.password.value ===
        registerForm.fields.passwordConfirmation.value,
    }));
  }, [
    registerForm.fields.password.value,
    registerForm.fields.passwordConfirmation.value,
  ]);

  const handlePasswordsBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.id === "password") {
      setPasswordsComparation((prev) => ({
        ...prev,
        passwordHasBlurred: true,
      }));
      return;
    }
    setPasswordsComparation((prev) => ({
      ...prev,
      confirmationHasBlurred: true,
    }));
  };

  const showPasswordConfirmationError = useMemo(
    () =>
      !passwordsComparation.areEqual &&
      passwordsComparation.passwordHasBlurred &&
      passwordsComparation.confirmationHasBlurred,
    [passwordsComparation]
  );

  return (
    <AuthFormWrapper title="Crie sua conta">
      <form>
        <div className={`${classes.inputs}`}>
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
            id="passwordConfirmation"
            maxLength={64}
            blurCallback={handlePasswordsBlur}
            field={registerForm.fields.passwordConfirmation}
            updateField={registerForm.updateField}
          />
        </div>
        {showPasswordConfirmationError && (
          <div className={classes.passwordAlert}>
            <SVGAlert />
            <p className="text-default feedback-negative">
              As senhas são diferentes
            </p>
          </div>
        )}
        <PrimaryButton className={classes.submitBtn}>criar conta</PrimaryButton>
      </form>
      <p className={`dneutral text-small ${classes.loginLink}`}>
        Já possui uma conta? Faça login{" "}
        <Link className="secondary-xdark" to="/auth/login">
          aqui
        </Link>
      </p>
    </AuthFormWrapper>
  );
};

export default AuthRegister;
