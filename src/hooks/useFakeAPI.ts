import { useEffect, useRef, useState } from "react";

import { Main, type Routes } from "@fakeAPI/Main";

type Response<T = unknown> =
  | {
      success: true;
      data: T | null;
    }
  | {
      success: false;
      error: {
        id: string;
        message: string;
      };
    };

type FakeAPIRequest = {
  response: Promise<Response>;
  cancel: () => void;
};

export default function useFakeAPI<T>(route: Routes) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | IFakeApiError>(null);
  const [loading, setLoading] = useState(false);

  const activeRequest = useRef<null | FakeAPIRequest>(null);

  async function fetch(body?: IFakeApiBody): Promise<Response<T>> {
    activeRequest.current?.cancel();
    activeRequest.current = Main.request(route, body);
    setLoading(true);
    setError(null);
    const response = await activeRequest.current.response;
    activeRequest.current = null;
    if (!response.success) {
      console.error(response.error.id);
      if (response.error.id === "REQUEST_CANCELLED") {
        if (activeRequest.current === null) setLoading(false);
        return response;
      }
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
