import { useRef, type FocusEvent } from "react";

import AuthFormWrapper from "./AuthFormWrapper";
import InputPassword from "@components/inputs/InputPassword";
import InputDefault from "@components/inputs/InputDefault";
import FormButton from "@components/ui/FormButton";
import Alert from "@components/ui/Alert";

import usePageTitle from "@hooks/usePageTitle";
import useJafh from "@hooks/useJafh";
import usePasswordMatcher from "@hooks/usePasswordMatcher";
import useFakeAPI from "@hooks/useFakeAPI";
import { useNavigate } from "react-router";

import fieldValidations from "@utils/fieldValidations";

import classes from "./AuthRecover.module.css";

const USER_NOT_FOUND_ERROR_ID = "AUTH_RECOVER_USER_NOT_FOUND";

const AuthRecover = () => {
  usePageTitle("Alpha Hardware | Recuperar conta");

  const navigate = useNavigate();

  const lastUserNotRegistred = useRef<string | null>(null);

  const recoverForm = useJafh(
    {
      username: { value: "", validation: fieldValidations.username },
      newPassword: { value: "", validation: fieldValidations.password },
      confirmation: {
        value: "",
        validation: fieldValidations.password,
      },
    },
    "Erro na validação, tente novamente",
  );

  const api = useFakeAPI<null>("POST api/auth/recoverPassword");

  const passwordMatcher = usePasswordMatcher(
    recoverForm.fields.newPassword.value,
    recoverForm.fields.confirmation.value,
  );

  const handlePasswordsBlur = (e: FocusEvent<HTMLInputElement>) => {
    passwordMatcher.blurField(
      e.target.id === "newPassword" ? "password" : "confirmation",
    );
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!recoverForm.isValid) return;
    const response = await api.fetch({
      username: recoverForm.fields.username.value,
      newPassword: recoverForm.fields.newPassword.value,
    });
    if (response.success) {
      navigate("/auth/login");
      return;
    }
    if (!response.success && response.error.id === USER_NOT_FOUND_ERROR_ID) {
      lastUserNotRegistred.current = recoverForm.fields.username.value;
    }
  };

  const isUserNotRegistred =
    recoverForm.fields.username.value === lastUserNotRegistred.current;

  return (
    <AuthFormWrapper title="Recupere sua senha">
      <p className={`text-default dneutral-xlight ${classes.instructions}`}>
        Para recuperar o acesso a conta, digite seu nome de usuário e atualize
        sua senha:
      </p>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputs}>
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
            id="newPassword"
            maxLength={4}
            blurCallback={handlePasswordsBlur}
            field={recoverForm.fields.newPassword}
            updateField={recoverForm.updateField}
          />
          <InputPassword
            containerClassName={classes.input}
            label="Confirme sua nova senha"
            id="confirmation"
            maxLength={4}
            blurCallback={handlePasswordsBlur}
            field={recoverForm.fields.confirmation}
            updateField={recoverForm.updateField}
          />
        </div>
        {passwordMatcher.showError && (
          <Alert className={classes.alert}>As senhas são diferentes</Alert>
        )}
        {api.error &&
          api.error.id === USER_NOT_FOUND_ERROR_ID &&
          isUserNotRegistred && (
            <Alert className={classes.alert}>{api.error.message}</Alert>
          )}
        {api.error && api.error.id !== USER_NOT_FOUND_ERROR_ID && (
          <Alert className={classes.alert}>{api.error.message}</Alert>
        )}
        <FormButton
          state={
            api.loading
              ? "loading"
              : !recoverForm.isValid ||
                  !passwordMatcher.areEqual ||
                  isUserNotRegistred
                ? "disable"
                : "enable"
          }
        >
          Atualizar
        </FormButton>
      </form>
    </AuthFormWrapper>
  );
};

export default AuthRecover;
