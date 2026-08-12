import UnderlinedTitle from "@components/ui/UnderlinedTitle";
import Alert from "@components/ui/Alert";

import usePageTitle from "@hooks/usePageTitle";
import useFakeAPI from "@hooks/useFakeAPI";
import { useAppForm } from "@hooks/useAppForm";

import { fieldValidators } from "@utils/fieldValidators";
import { toasts } from "@features/toasts";

import classes from "./Account.module.css";

const Account = () => {
  usePageTitle("Alpha Hardware | Minha conta");

  const api = useFakeAPI("POST api/auth/updatePassword");

  const form = useAppForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmation: "",
    },
    onSubmit: async ({ value }) => {
      const response = await api.fetch({
        password: value.password,
        newPassword: value.newPassword,
      });
      if (!response.success) return;
      toasts.emit("Senha alterada com sucesso", "success");
      form.reset();
    },
  });

  return (
    <section className={classes.container}>
      <UnderlinedTitle align="left" className={classes.title}>
        Altere sua senha
      </UnderlinedTitle>
      <form.AppForm>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className={classes.inputs}>
            <form.AppField
              name="password"
              validators={{
                onChange: ({ value }) => fieldValidators.password(value),
                onMount: ({ value }) => fieldValidators.password(value),
              }}
              children={(field) => (
                <field.FieldPassword
                  className={classes.input}
                  label="Senha"
                  maxLength={4}
                />
              )}
            />
            <form.AppField
              name="newPassword"
              validators={{
                onChange: ({ value }) => fieldValidators.password(value),
                onMount: ({ value }) => fieldValidators.password(value),
              }}
              children={(field) => (
                <field.FieldPassword
                  className={classes.input}
                  label="Nova senha"
                  maxLength={4}
                />
              )}
            />
            <form.AppField
              name="confirmation"
              validators={{
                onChangeListenTo: ["newPassword"],
                onChange: ({ value, fieldApi }) => {
                  const validation = fieldValidators.password(value);
                  if (validation) return validation;
                  const password = fieldApi.form.getFieldValue("newPassword");
                  if (value !== password) return "As senhas são diferentes";
                  return undefined;
                },
                onMount: ({ value }) => fieldValidators.password(value),
              }}
              children={(field) => (
                <field.FieldPassword
                  className={classes.input}
                  label="Confirme a nova senha"
                  maxLength={4}
                />
              )}
            />
          </div>
          {api.error && (
            <Alert className={classes.alert}>{api.error.message}</Alert>
          )}
          <form.SubmitButton>alterar</form.SubmitButton>
        </form>
      </form.AppForm>
    </section>
  );
};

export default Account;

