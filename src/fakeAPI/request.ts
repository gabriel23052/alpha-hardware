import { config } from "./config";
import { Errors } from "./Errors";
import { isRequestBody } from "./isRequestBody";
import type { Response } from "./ResponseBuilder";
import { routes } from "./routes";

function request(route: keyof typeof routes, body?: unknown) {
  const maxResponseTime = config.maxResponseTime;
  const minResponseTime = config.minResponseTime;
  let abort = false;

  const response = new Promise<Response>((resolve) => {
    window.setTimeout(
      () => {
        if (abort) {
          return resolve({
            success: false,
            error: Errors.get("REQUEST_CANCELLED"),
          });
        }

        if (!(route in routes)) {
          return resolve({
            success: false,
            error: Errors.get("ROUTE_NOT_FOUND"),
          });
        }

        if (body !== undefined && !isRequestBody(body)) {
          return resolve({
            success: false,
            error: Errors.get("INVALID_BODY"),
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
