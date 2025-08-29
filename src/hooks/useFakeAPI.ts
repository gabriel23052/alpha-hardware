import { useState } from "react";

import endpoints from "@fakeAPI/endpoints";

export default function useFakeAPI<T>(route: keyof typeof endpoints) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const routeHandler = endpoints[route];

  const MAX_RESPONSE_TIME = 3000;
  const MIN_RESPONSE_TIME = 1000;

  function request(params?: Record<string, unknown>) {
    setLoading(true);
    if (routeHandler === undefined) {
      setError("Rota não encontrada");
      return;
    }
    setTimeout(() => {
      const response = routeHandler(params || {});
      if (response.error !== null) {
        setError(response.error);
        setLoading(false);
        return;
      }
      setData(response.data as T);
      setLoading(false);
    }, Math.floor(Math.random() * MAX_RESPONSE_TIME) + MIN_RESPONSE_TIME);
  }

  return { data, error, loading, request };
}
