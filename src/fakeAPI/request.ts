import { config } from "./config";
import { getFakeAPIError } from "./errors";
import { isRequestBody } from "./isRequestBody";
import { routes } from "./routes";

function request(route: keyof typeof routes, body?: unknown) {
  const maxResponseTime = config.maxResponseTime;
  const minResponseTime = config.minResponseTime;
  let abort = false;

  const response = new Promise<FAResponse>((resolve) => {
    window.setTimeout(
      () => {
        if (abort) {
          return resolve({
            success: false,
            error: getFakeAPIError("REQUEST_CANCELLED"),
          });
        }

        if (!(route in routes)) {
          return resolve({
            success: false,
            error: getFakeAPIError("ROUTE_NOT_FOUND"),
          });
        }

        if (body !== undefined && !isRequestBody(body)) {
          return resolve({
            success: false,
            error: getFakeAPIError("INVALID_BODY"),
          });
        }

        resolve(routes[route](body));
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
