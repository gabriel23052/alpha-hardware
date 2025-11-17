import { useEffect, useRef, useState } from "react";

import type routeHandlers from "@fakeAPI/routeHandlers";
import request from "@fakeAPI/request";

export default function useFakeAPI<T>(route: keyof typeof routeHandlers) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | IFakeApiError>(null);
  const [loading, setLoading] = useState(false);

  const activeRequest = useRef<null | {
    promise: Promise<IFakeApiResponse<T>>;
    cancel: () => void;
  }>(null);

  async function fetch(params?: object) {
    activeRequest.current?.cancel();
    activeRequest.current = request<T>(route, params);
    setLoading(true);
    const response = await activeRequest.current.promise;
    activeRequest.current = null;
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setData(response.data as T);
    setLoading(false);
  }

  function cancel() {
    activeRequest.current?.cancel();
  }

  useEffect(() => {
    return cancel;
  }, []);

  return { data, error, loading, fetch, cancel };
}
