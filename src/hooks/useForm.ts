import { useState } from "react";

import validations from "@utils/validations";

type FieldConfig = {
  initialValue: IJsonValue;
  validation: keyof typeof validations | null;
};

export default function useForm<const T extends Record<string, FieldConfig>>(
  fields: T
) {
  type FormState = {
    [K in keyof T]: { value: T[K]["initialValue"]; error: string | null };
  };

  const initialState = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      { value: value.initialValue, error: null },
    ])
  ) as FormState;

  const [data, setData] = useState(initialState);
  const changeData = (id: string, value: IJsonValue) => {
    if (!(id in data)) {
      console.error(`O campo de ID "${id}" não existe`);
      return;
    }
    const error = fields[id].validation
      ? validations[fields[id].validation](value)
      : null;
    setData((prevData) => ({
      ...prevData,
      [id]: { value, error },
    }));
    return;
  };

  return { data, changeData };
}
