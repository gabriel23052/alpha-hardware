import type { FocusEvent, FormEventHandler } from "react";

import UnderlinedTitle from "@components/ui/UnderlinedTitle";
import InputPassword from "@components/inputs/InputPassword";
import FormButton from "@components/ui/FormButton";
import Alert from "@components/ui/Alert";

import usePasswordMatcher from "@hooks/usePasswordMatcher";
import useJafh from "@hooks/useJafh";
import usePageTitle from "@hooks/usePageTitle";
import useFakeAPI from "@hooks/useFakeAPI";

import { toasts } from "@features/toasts";
import fieldValidations from "@utils/fieldValidations";

import classes from "./DashboardAccount.module.css";

const DashboardAccount = () => {
  usePageTitle("Alpha Hardware | Minha conta");

  const form = useJafh(
    {
      password: { value: "", validation: fieldValidations.password },
      newPassword: { value: "", validation: fieldValidations.password },
      confirmation: {
        value: "",
        validation: fieldValidations.password,
      },
    },
    "Erro na validação, tente novamente",
  );

  const api = useFakeAPI("POST api/auth/updatePassword");

  const passwordMatcher = usePasswordMatcher(
    form.fields.newPassword.value,
    form.fields.confirmation.value,
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await api.fetch({
      password: form.fields.password.value,
      newPassword: form.fields.newPassword.value,
    });
    if (!response.success) return;
    toasts.emit("Senha alterada com sucesso", "success");
    form.reset();
  };

  const handlePasswordsBlur = (e: FocusEvent<HTMLInputElement>) => {
    passwordMatcher.blurField(
      e.target.id === "newPassword" ? "password" : "confirmation",
    );
  };

  const isThePasswordsEqual =
    form.fields.password.value !== "" &&
    form.fields.password.value === form.fields.newPassword.value;

  return (
    <section className={classes.container}>
      <UnderlinedTitle align="left" className={classes.title}>
        Altere sua senha
      </UnderlinedTitle>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.inputs}>
          <InputPassword
            containerClassName={classes.input}
            label="Senha atual"
            id="password"
            maxLength={4}
            field={form.fields.password}
            updateField={form.updateField}
          />
          <InputPassword
            containerClassName={classes.input}
            label="Nova senha"
            id="newPassword"
            maxLength={4}
            blurCallback={handlePasswordsBlur}
            field={form.fields.newPassword}
            updateField={form.updateField}
          />
          <InputPassword
            containerClassName={classes.input}
            label="Confirme sua nova senha"
            id="confirmation"
            maxLength={4}
            blurCallback={handlePasswordsBlur}
            field={form.fields.confirmation}
            updateField={form.updateField}
          />
        </div>
        {passwordMatcher.showError && (
          <Alert className={classes.alert}>
            A senha e a confirmação não são iguais
          </Alert>
        )}
        {isThePasswordsEqual && (
          <Alert className={classes.alert}>A nova senha é igual a atual</Alert>
        )}
        {api.error && (
          <Alert className={classes.alert}>{api.error.message}</Alert>
        )}
        <FormButton
          state={
            api.loading
              ? "loading"
              : !form.isValid ||
                  !passwordMatcher.areEqual ||
                  isThePasswordsEqual
                ? "disable"
                : "enable"
          }
        >
          Alterar
        </FormButton>
      </form>
    </section>
  );
};

export default DashboardAccount;

