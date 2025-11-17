import { useState } from "react";

import type routeHandlers from "@fakeAPI/routeHandlers";
import request from "@fakeAPI/request";

export default function useFakeAPI<T>(route: keyof typeof routeHandlers) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | IFakeApiError>(null);
  const [loading, setLoading] = useState(false);

  async function fetch(params?: object) {
    setLoading(true);
    const response = await request<T>(route, params);
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setData(response.data as T);
    setLoading(false);
  }

  return { data, error, loading, fetch };
}
