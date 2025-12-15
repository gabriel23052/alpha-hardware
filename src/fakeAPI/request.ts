import endpoints from "./routeHandlers";

const MAX_RESPONSE_TIME = 1000;
const MIN_RESPONSE_TIME = 500;

export default function request<T>(
  route: keyof typeof endpoints,
  params?: object
) {
  let timeout: number | null = null;
  const promise = new Promise<IFakeApiResponse<T>>((resolve) => {
    timeout = window.setTimeout(() => {
      if (!(route in endpoints)) {
        resolve({
          data: null,
          error: {
            userFriendly: false,
            message: `A rota "${route}" não existe`,
          },
        });
      }
      const routeHandler = endpoints[route];
      resolve(routeHandler(params || {}) as IFakeApiResponse<T>);
    }, Math.floor(Math.random() * MAX_RESPONSE_TIME) + MIN_RESPONSE_TIME);
  });

  function cancel() {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  return { promise, cancel };
}
