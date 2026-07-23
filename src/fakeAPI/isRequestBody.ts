function isRequestBodyData(value: unknown): value is FARequestBodyData {
  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
      return true;

    case "object":
      if (value === null) {
        return true;
      }

      if (Array.isArray(value)) {
        return value.every(isRequestBodyData);
      }

      return Object.values(value).every(isRequestBodyData);

    default:
      return false;
  }
}

function isRequestBody(value: unknown): value is FARequestBody {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    Object.keys(value).length === 0
  ) {
    return false;
  }

  return Object.values(value).every(isRequestBodyData);
}

export { isRequestBody };
