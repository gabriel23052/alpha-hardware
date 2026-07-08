import { useMemo, useState } from "react";

export default function usePasswordMatcher(
  password: string,
  confirmation: string
) {
  const [hasBlurred, setHasBlurred] = useState({
    password: false,
    confirmation: false,
  });

  const areEqual = password === confirmation;

  const showError = useMemo(
    () =>
      !areEqual &&
      hasBlurred.password &&
      hasBlurred.confirmation,
    [hasBlurred, areEqual]
  );

  const blurField = (field: "password" | "confirmation") => {
    if (field === "password") {
      setHasBlurred((prev) => ({
        ...prev,
        password: true,
      }));
      return;
    }
    setHasBlurred((prev) => ({
      ...prev,
      confirmation: true,
    }));
  };

  return { areEqual, blurField, showError };
}
