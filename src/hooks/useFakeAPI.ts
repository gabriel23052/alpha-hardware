import { useState } from "react";

import endpoints from "@fakeAPI/endpoints";
import fakeFetch from "@utils/fakeFetch";

export default function useFakeAPI<T>(route: keyof typeof endpoints) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  async function request(params?: Record<string, unknown>) {
    setLoading(true);
    const response = await fakeFetch(route, params);
    if (response.error !== null) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setData(response.data as T);
    setLoading(false);
  }

  return { data, error, loading, request };
}
