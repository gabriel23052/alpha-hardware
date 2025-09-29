import { useState } from "react";

import validations from "@utils/validations";

type FieldConfig = {
  initialValue: IJsonValue;
  validation: keyof typeof validations | null;
};

export default function useForm<const T extends Record<string, FieldConfig>>(
  fieldsConfig: T
) {
  type FormState = {
    [K in keyof T]: { value: T[K]["initialValue"]; error: string | null };
  };

  const initialState = Object.fromEntries(
    Object.entries(fieldsConfig).map(([key, value]) => [
      key,
      { value: value.initialValue, error: null },
    ])
  ) as FormState;

  const [fields, setData] = useState(initialState);

  const fieldHandler = (id: string, value: IJsonValue) => {
    if (!(id in fields)) {
      console.error(`O campo de ID "${id}" não existe`);
      return;
    }
    const error = fieldsConfig[id].validation
      ? validations[fieldsConfig[id].validation](value)
      : null;
    setData((prevData) => ({
      ...prevData,
      [id]: { value, error },
    }));

    return;
  };

  return { fields, fieldHandler };
}
