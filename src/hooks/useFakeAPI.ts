import { useState } from "react";

import endpoints from "@fakeAPI/endpoints";

export default function useFakeAPI<T>(route: keyof typeof endpoints) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | string>(null);
  const routeHandler = endpoints[route];

  function request(params: Record<string, unknown>) {
    if (routeHandler === undefined) {
      setError("Rota não encontrada");
      return;
    }
    const response = routeHandler(params);
    if (response.error !== null) {
      setError(response.error);
      return;
    };
    setData(response.data as T);
  }

  return { data, error, request };
}
