import { useEffect, useRef, useState } from "react";

import { routes } from "@fakeAPI/routes";
import { request } from "@fakeAPI/request";

type FakeAPIRequest = {
  promise: Promise<IFakeApiResponse | void>;
  cancel: () => void;
};

export default function useFakeAPI<T>(route: keyof typeof routes) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | IFakeApiError>(null);
  const [loading, setLoading] = useState(false);

  const activeRequest = useRef<null | FakeAPIRequest>(null);

  async function fetch(
    params?: IFakeApiReqParams,
  ): Promise<IFakeApiResponse<T>> {
    activeRequest.current?.cancel();
    activeRequest.current = request(route, params);
    setLoading(true);
    setError(null);
    const response = await activeRequest.current.promise;
    if (!response) {
      if (activeRequest.current === null) setLoading(false);
      return {
        success: false,
        error: {
          id: "REQUEST_CANCELLED",
          message: "Requisição cancelada",
        },
      };
    }
    activeRequest.current = null;
    if (!response.success) {
      console.error(response.error.id);
      setError(response.error);
      setLoading(false);
      return response;
    }
    setData(response.data as T);
    setLoading(false);
    return response as IFakeApiResponse<T>;
  }

  function cancel() {
    activeRequest.current?.cancel();
  }

  useEffect(() => {
    return cancel;
  }, []);

  return { data, error, loading, fetch, cancel };
}
