import { config } from "./config";
import { ErrorMessages } from "./ErrorMessages";
import { routes } from "./routes";

function request(route: keyof typeof routes, params?: FARequestParameter) {
  const maxResponseTime = config.maxResponseTime;
  const minResponseTime = config.minResponseTime;
  let abort = false;

  const promise = new Promise<FAResponse | void>((resolve) => {
    window.setTimeout(
      () => {
        if (abort) resolve();
        if (!(route in routes)) {
          resolve({
            success: false,
            error: {
              userFriendly: false,
              message: ErrorMessages.ROUTE_NOT_FOUND,
            },
          });
        }
        const routeHandler = routes[route];
        resolve(routeHandler(params ?? undefined));
      },
      Math.floor(Math.random() * maxResponseTime) + minResponseTime,
    );
  });

  function cancel() {
    abort = true;
  }

  return { promise, cancel };
}

export { request };
