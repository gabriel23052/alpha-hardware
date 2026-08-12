import { Link, useNavigate } from "react-router";

import FormWrapper from "./FormWrapper";
import Notice from "./Notice";
import Alert from "@components/ui/Alert";

import usePageTitle from "@hooks/usePageTitle";
import useFakeAPI from "@hooks/useFakeAPI";
import { useAppForm } from "@hooks/useAppForm";

import { fieldValidators } from "@utils/fieldValidators";
import { toasts } from "@features/toasts";
import { session } from "@features/session";

import classes from "./RegisterForm.module.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  usePageTitle("Alpha Hardware | Cadastrar-se");

  const api = useFakeAPI<IUser>("POST api/auth/register");

  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
      confirmation: "",
    },
    onSubmit: async ({ value }) => {
      const response = await api.fetch({
        username: value.username.trim(),
        password: value.password.trim(),
      });
      if (!response.success || !response.data) return;
      session.start(response.data);
      toasts.emit("Registro efetuado com sucesso", "success");
      navigate("/");
    },
  });

  return (
    <FormWrapper title="Crie sua conta">
      <form.AppForm>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Notice>
            Por tratar-se de uma demonstração com dados armazenados localmente,
            o sistema de autenticação é simplificado, necessitando apenas de um
            nome de usuário e uma senha númerica de 4 dígitos.
          </Notice>
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
              name="confirmation"
              validators={{
                onChangeListenTo: ["password"],
                onChange: ({ value, fieldApi }) => {
                  const validation = fieldValidators.password(value);
                  if (validation) return validation;
                  const password = fieldApi.form.getFieldValue("password");
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
          <form.SubmitButton className={classes.submitBtn}>
            cadastrar
          </form.SubmitButton>
        </form>
      </form.AppForm>
      <p className={`text-small dneutral ${classes.loginLink}`}>
        Já possui uma conta? Faça login{" "}
        <Link className="secondary-xdark" to="/auth/login">
          aqui
        </Link>
      </p>
    </FormWrapper>
  );
};

export default RegisterForm;
