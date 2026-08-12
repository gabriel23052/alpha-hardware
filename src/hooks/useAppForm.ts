import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@lib/form/formContexts";

import SubmitButton from "@components/ui/SubmitButton";
import Text from "@components/fields/Text";
import Password from "@components/fields/Password";
import Price from "@components/fields/Price";
import Categories from "@components/fields/Categories";
import Tags from "@components/fields/Tags";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  formComponents: {
    SubmitButton,
  },
  fieldComponents: {
    FieldText: Text,
    FieldPassword: Password,
    FieldCategories: Categories,
    FieldPrice: Price,
    FieldTags: Tags,
  },
});

export { useAppForm };
