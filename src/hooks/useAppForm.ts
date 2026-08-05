import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@lib/form/formContexts";

import FieldText from "@components/inputs/FieldText";
import FieldPassword from "@components/inputs/FieldPassword";
import SubmitButton from "@components/ui/SubmitButton";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  formComponents: {
    SubmitButton,
  },
  fieldComponents: {
    FieldText,
    FieldPassword,
  },
});

export { useAppForm };
