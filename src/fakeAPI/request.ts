import endpoints from "./routeHandlers";

const MAX_RESPONSE_TIME = 500;
const MIN_RESPONSE_TIME = 1000;

export default async function request<T>(
  route: keyof typeof endpoints,
  params?: object
): Promise<IFakeApiResponse<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
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
}
