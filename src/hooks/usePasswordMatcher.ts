import { useMemo, useState } from "react";

export default function usePasswordMatcher(
  password: string,
  confirmation: string
) {
  const [hasBlurred, setHasBlurred] = useState({
    password: false,
    confirmation: false,
  });

  const showError = useMemo(
    () =>
      password !== confirmation &&
      hasBlurred.password &&
      hasBlurred.confirmation,
    [hasBlurred, password, confirmation]
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

  return { blurField, showError };
}
