import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@lib/form/formContexts";

import SubmitButton from "@components/ui/SubmitButton";
import FieldText from "@components/fields/FieldText";
import FieldPassword from "@components/fields/FieldPassword";
import FieldPrice from "@components/fields/FieldPrice";
import FieldCategories from "@components/fields/FieldCategories";
import FieldTags from "@components/fields/FieldTags";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  formComponents: {
    SubmitButton,
  },
  fieldComponents: {
    FieldText,
    FieldPassword,
    FieldCategories,
    FieldPrice,
    FieldTags,
  },
});

export { useAppForm };
