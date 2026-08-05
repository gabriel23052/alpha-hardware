import { useNavigate } from "react-router";

import AuthFormWrapper from "./AuthFormWrapper";
import Alert from "@components/ui/Alert";

import usePageTitle from "@hooks/usePageTitle";
import useFakeAPI from "@hooks/useFakeAPI";
import { useAppForm } from "@hooks/useAppForm";

import { toasts } from "@features/toasts";
import { fieldValidators } from "@utils/fieldValidators";

import classes from "./AuthRecover.module.css";

const AuthRecover = () => {
  usePageTitle("Alpha Hardware | Recuperar conta");

  const navigate = useNavigate();

  const api = useFakeAPI<null>("POST api/auth/recoverPassword");

  const form = useAppForm({
    defaultValues: {
      username: "",
      newPassword: "",
      confirmation: "",
    },
    onSubmit: async ({ value }) => {
      const response = await api.fetch({
        username: value.username.trim(),
        newPassword: value.newPassword.trim(),
      });
      if (!response.success) return;
      toasts.emit("Senha alterada com sucesso", "success");
      navigate("/auth/login");
    },
  });

  return (
    <AuthFormWrapper title="Recupere sua senha">
      <p className={`text-default dneutral-xlight ${classes.instructions}`}>
        Para recuperar o acesso a conta, digite seu nome de usuário e atualize
        sua senha:
      </p>
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
                <field.FieldText
                  className={classes.input}
                  label="Nome de usuário"
                  maxLength={30}
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
                  label="Senha"
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
                  label="Confirme sua senha"
                  maxLength={4}
                />
              )}
            />
          </div>
          {api.error && (
            <Alert className={classes.alert}>{api.error.message}</Alert>
          )}
          <form.SubmitButton>atualizar</form.SubmitButton>
        </form>
      </form.AppForm>
    </AuthFormWrapper>
  );
};

export default AuthRecover;
