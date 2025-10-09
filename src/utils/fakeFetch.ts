import endpoints from "@fakeAPI/endpoints";

export default async function fakeFetch<T>(
  route: keyof typeof endpoints,
  params?: object
): Promise<IFakeApiResponse<T>> {
  const MAX_RESPONSE_TIME = 500;
  const MIN_RESPONSE_TIME = 1000;
  const routeHandler = endpoints[route];
  return new Promise((resolve) => {
    if (!routeHandler) {
      resolve({ data: null, error: "Rota não encontrada" });
    }
    setTimeout(() => {
      resolve(routeHandler(params || {}) as IFakeApiResponse<T>);
    }, Math.floor(Math.random() * MAX_RESPONSE_TIME) + MIN_RESPONSE_TIME);
  });
}
