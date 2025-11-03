import { useMemo, useRef, useState } from "react";

export type JafhFieldConfig<T> = {
  value: T;
  validation: JafhValidation | null;
};

export type JafhField<T> = {
  value: T;
  error: string | null;
};

export type JafhValidation = (value: unknown) => JafhError | null;

export type JafhUpdateField<T> = (id: string, newValue: T) => void;

export type JafhError = {
  message: string;
  userFriendly: boolean;
};

export type JafhForm<T> = {
  fields: { [K in keyof T]: JafhField<T[K]> };
  updateField: <T>(id: string, newValue: T) => void;
  isValid: boolean;
  getData: () => { [K in keyof T]: T[K] };
  reset: () => void;
};

/**
 * The hook `useJafh` returns an object of type `JafhForm` that contains the state and functions to handle the form
 * @param fieldsConfig An object of type `FieldConfig` that contains the fields configuration
 * @param validationErrorMessage Default error message to use when the validation is not "user friendly"
 * */
export default function useJafh<T extends { [key: string]: unknown }>(
  fieldsConfig: { [K in keyof T]: JafhFieldConfig<T[K]> },
  validationErrorMessage: string
): JafhForm<T> {
  type FHState = { [K in keyof T]: JafhField<T[K]> };

  const fieldsId = useRef<(keyof T)[]>(Object.keys(fieldsConfig));

  const [fields, setFields] = useState(
    fieldsId.current.reduce((fieldsState, fieldId) => {
      const fieldConfig = fieldsConfig[fieldId];
      const error = fieldConfig.validation
        ? fieldConfig.validation(fieldConfig.value)
        : null;
      let message = null;
      if (error) {
        if (error.userFriendly) {
          message = error.message;
        } else {
          console.error(error.message);
          message = validationErrorMessage;
        }
      }
      fieldsState[fieldId as keyof T] = {
        value: fieldConfig.value,
        error: message,
      };
      return fieldsState;
    }, {} as FHState)
  );

  const isValid = useMemo(
    () => Object.values(fields).every((field) => !field.error),
    [fields]
  );

  function updateField<T>(id: string, newValue: T) {
    if (!(id in fields)) {
      console.error(`[JAFH] ERROR: Field with ID ${id} does not exist`);
      return;
    }
    const error = fieldsConfig[id].validation
      ? fieldsConfig[id].validation(newValue)
      : null;
    if (error) {
      if (error.userFriendly) {
        setFields((prev) => ({
          ...prev,
          [id]: { value: newValue, error: error.message },
        }));
        return;
      }
      console.error(error.message);
      setFields((prev) => ({
        ...prev,
        [id]: { value: newValue, error: validationErrorMessage },
      }));
      return;
    }
    setFields((prev) => ({ ...prev, [id]: { value: newValue, error: null } }));
  }

  function reset() {
    setFields(
      fieldsId.current.reduce((fieldsState, fieldId) => {
        const fieldConfig = fieldsConfig[fieldId];
        const error = fieldConfig.validation
          ? fieldConfig.validation(fieldConfig.value)
          : null;
        let message = null;
        if (error) {
          message = error.userFriendly ? error.message : validationErrorMessage;
        }
        fieldsState[fieldId as keyof T] = {
          value: fieldConfig.value,
          error: message,
        };
        return fieldsState;
      }, {} as FHState)
    );
  }

  function getData() {
    return Object.fromEntries(
      fieldsId.current.map((fieldId) => [fieldId, fields[fieldId].value])
    ) as { [K in keyof T]: T[K] };
  }

  return { fields, updateField, isValid, getData, reset };
}
