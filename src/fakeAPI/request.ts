import { config } from "./config";
import { getFakeAPIError } from "./errors";
import { routes } from "./routes";

function request(route: keyof typeof routes, params?: FARequestParameter) {
  const maxResponseTime = config.maxResponseTime;
  const minResponseTime = config.minResponseTime;
  let abort = false;

  const response = new Promise<FAResponse | void>((resolve) => {
    window.setTimeout(
      () => {
        if (abort) resolve();
        if (!(route in routes)) {
          return resolve({
            success: false,
            error: getFakeAPIError("ROUTE_NOT_FOUND"),
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

  return { response, cancel };
}

export { request };
