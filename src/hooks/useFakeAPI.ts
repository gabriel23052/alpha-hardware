import { useEffect, useRef, useState } from "react";

import { Main, type Routes } from "@fakeAPI/Main";

type RequestBodyData =
  | number
  | string
  | boolean
  | RequestBodyData[]
  | { [key: string]: RequestBodyData };

type RequestBody = Record<string, RequestBodyData>;

type Response<T = unknown> =
  | {
      success: true;
      data: T | null;
    }
  | {
      success: false;
      error: ResponseError;
    };

export type ResponseError = {
  id: string;
  message: string;
};

type Request = {
  response: Promise<Response>;
  cancel: () => void;
};

export default function useFakeAPI<T>(route: Routes) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | ResponseError>(null);
  const [loading, setLoading] = useState(false);

  const activeRequest = useRef<null | Request>(null);

  async function fetch(body?: RequestBody): Promise<Response<T>> {
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
    return response as Response<T>;
  }

  function cancel() {
    activeRequest.current?.cancel();
  }

  useEffect(() => {
    return cancel;
  }, []);

  return { data, error, loading, fetch, cancel };
}
