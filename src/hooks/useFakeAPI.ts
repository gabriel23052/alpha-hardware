import { useEffect, useRef, useState } from "react";

import { routes } from "@fakeAPI/routes";
import { request } from "@fakeAPI/request";

type FakeAPIRequest = {
  promise: Promise<IFakeApiResponse | void>;
  cancel: () => void;
};

const GENERIC_ERROR_MESSAGE = "Ocorreu um erro inesperado, tente novamente";

export default function useFakeAPI<T>(route: keyof typeof routes) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const activeRequest = useRef<null | FakeAPIRequest>(null);

  async function fetch(params?: IFakeApiReqParams): Promise<IFakeApiResponse<T>> {
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
          userFriendly: false,
          message: "Requisição cancelada",
        },
      };
    }
    activeRequest.current = null;
    if (!response.success) {
      setError(() => {
        if (response.error.userFriendly) {
          return response.error.message;
        }
        console.error(response.error.message);
        return GENERIC_ERROR_MESSAGE;
      });
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
