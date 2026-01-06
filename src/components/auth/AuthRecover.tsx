import { type FocusEvent } from "react";

import AuthFormWrapper from "./AuthFormWrapper";
import InputPassword from "@components/inputs/InputPassword";
import InputDefault from "@components/inputs/InputDefault";
import PrimaryButton from "@components/PrimaryButton";
import Alert from "@components/Alert";

import useJafh from "@hooks/useJafh";
import usePasswordMatcher from "@hooks/usePasswordMatcher";

import FieldValidations from "@utils/FieldValidations";

import classes from "./AuthRecover.module.css";

const AuthRecover = () => {
  const recoverForm = useJafh(
    {
      username: { value: "", validation: FieldValidations.username },
      password: { value: "", validation: FieldValidations.password },
      confirmation: {
        value: "",
        validation: FieldValidations.password,
      },
    },
    "Erro na validação, tente novamente"
  );

  const passwordMatcher = usePasswordMatcher(
    recoverForm.fields.password.value,
    recoverForm.fields.confirmation.value
  );

  const handlePasswordsBlur = (e: FocusEvent<HTMLInputElement>) => {
    passwordMatcher.blurField(
      e.target.id === "password" ? "password" : "confirmation"
    );
  };

  return (
    <AuthFormWrapper title="Recupere sua senha">
      <p className={`dneutral-xlight text-default ${classes.instructions}`}>
        Para recuperar o acesso a conta, digite seu nome de usuário e atualize
        sua senha:
      </p>
      <div className={`${classes.inputs}`}>
        <InputDefault
          containerClassName={classes.input}
          label="Nome de usuário"
          id="username"
          maxLength={30}
          field={recoverForm.fields.username}
          updateField={recoverForm.updateField}
        />
        <InputPassword
          containerClassName={classes.input}
          label="Nova senha"
          id="password"
          maxLength={64}
          blurCallback={handlePasswordsBlur}
          field={recoverForm.fields.password}
          updateField={recoverForm.updateField}
        />
        <InputPassword
          containerClassName={classes.input}
          label="Confirme sua nova senha"
          id="confirmation"
          maxLength={64}
          blurCallback={handlePasswordsBlur}
          field={recoverForm.fields.confirmation}
          updateField={recoverForm.updateField}
        />
      </div>
      {passwordMatcher.showError && (
        <Alert className={classes.passwordAlert}>
          As senhas são diferentes
        </Alert>
      )}
      <PrimaryButton>Atualizar</PrimaryButton>
    </AuthFormWrapper>
  );
};

export default AuthRecover;
