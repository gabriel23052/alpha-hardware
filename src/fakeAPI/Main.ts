import { config } from "./config";
import { Errors } from "./Errors";
import { PayloadValidators } from "./PayloadValidators";
import type { User } from "./queries/UsersQuery";
import { ResponseBuilder, type Response } from "./ResponseBuilder";
import { AuthService } from "./services/AuthService";
import {
  FavoritesService,
  type FavoriteAllPatterns,
} from "./services/FavoritesService";
import {
  HomepageService,
  type HomepageBanners,
  type HomepageCollections,
} from "./services/HomepageService";
import {
  ProductsService,
  type ProductAllPatterns,
} from "./services/ProductsService";
import type { Product } from "./tables/ProductsTable";
import type { Sale } from "./tables/SalesTable";
import { Utils } from "./Utils";

export type Routes = keyof (typeof Main)["routes"];

export type RequestBodyData =
  | number
  | string
  | boolean
  | null
  | RequestBodyData[]
  | { [key: string]: RequestBodyData };

export type RequestBody = Record<string, RequestBodyData>;

class Main {
  public static request(route: Routes, body?: unknown) {
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

          if (!(route in this.routes)) {
            return resolve({
              success: false,
              error: Errors.get("ROUTE_NOT_FOUND"),
            });
          }

          if (body !== undefined && !Utils.isRequestBody(body)) {
            return resolve({
              success: false,
              error: Errors.get("INVALID_BODY"),
            });
          }
          resolve(this.routes[route](body));
        },
        Math.floor(Math.random() * maxResponseTime) + minResponseTime,
      );
    });

    function cancel() {
      abort = true;
    }

    return { response, cancel };
  }

  public static routes: Record<string, (body?: RequestBody) => Response> = {
    "GET api/homepage/banners": (): Response<HomepageBanners> => {
      const resBuilder = new ResponseBuilder<HomepageBanners>();
      const homepageService = new HomepageService();
      homepageService.getBanners(resBuilder);
      return resBuilder.build();
    },

    "GET api/homepage/sale": (): Response<Sale["resolvedProducts"]> => {
      const resBuilder = new ResponseBuilder<Sale["resolvedProducts"]>();
      const homepageService = new HomepageService();
      homepageService.getSale(resBuilder);
      return resBuilder.build();
    },

    "GET api/homepage/collections": (): Response<HomepageCollections> => {
      const resBuilder = new ResponseBuilder<HomepageCollections>();
      const homepageService = new HomepageService();
      homepageService.getCollections(resBuilder);
      return resBuilder.build();
    },

    "GET api/products/id": (body): Response<Product["default"]> => {
      const resBuilder = new ResponseBuilder<Product["default"]>();
      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      const productsHandler = new ProductsService();
      if (!PayloadValidators.productIdQuery(resBuilder, body)) {
        return resBuilder.build();
      }

      productsHandler.getProductById(resBuilder, body.id);
      return resBuilder.build();
    },

    "GET api/products/query": (body): Response<ProductAllPatterns[]> => {
      const resBuilder = new ResponseBuilder<ProductAllPatterns[]>();
      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      const productsHandler = new ProductsService();
      if (!PayloadValidators.productQuery(resBuilder, body)) {
        return resBuilder.build();
      }
      productsHandler.getByQuery(resBuilder, body);
      return resBuilder.build();
    },

    "GET api/products/related": (body): Response<Product["card"][]> => {
      const resBuilder = new ResponseBuilder<Product["card"][]>();
      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      const productsHandler = new ProductsService();
      if (!PayloadValidators.productIdQuery(resBuilder, body)) {
        return resBuilder.build();
      }

      productsHandler.getRelated(resBuilder, body.id);
      return resBuilder.build();
    },

    "POST api/auth/register": (body): Response<User["private"]> => {
      const resBuilder = new ResponseBuilder<User["private"]>();
      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      const authService = new AuthService();

      if (!PayloadValidators.authRegisterPayload(resBuilder, body)) {
        return resBuilder.build();
      }

      authService.register(resBuilder, body);

      return resBuilder.build();
    },

    "POST api/auth/login": (body): Response<User["private"]> => {
      const resBuilder = new ResponseBuilder<User["private"]>();

      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      const authService = new AuthService();

      if (!PayloadValidators.authLoginPayload(resBuilder, body)) {
        return resBuilder.build();
      }

      authService.login(resBuilder, body);

      return resBuilder.build();
    },

    "POST api/auth/logout": (): Response<null> => {
      const resBuilder = new ResponseBuilder<null>();
      const authService = new AuthService();

      authService.logout();

      return resBuilder.build();
    },

    "POST api/auth/verifySession": (): Response<null> => {
      const resBuilder = new ResponseBuilder<null>();
      const authService = new AuthService();

      authService.validateSession(resBuilder);

      return resBuilder.build();
    },

    "POST api/auth/recoverPassword": (body): Response<null> => {
      const resBuilder = new ResponseBuilder<null>();

      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      const authService = new AuthService();

      if (!PayloadValidators.authRecoverPayload(resBuilder, body)) {
        return resBuilder.build();
      }

      authService.recover(resBuilder, body);

      return resBuilder.build();
    },

    "POST api/auth/updatePassword": (body): Response<null> => {
      const resBuilder = new ResponseBuilder<null>();
      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      const authService = new AuthService();

      if (!PayloadValidators.authUpdatePasswordPayload(resBuilder, body)) {
        return resBuilder.build();
      }

      authService.updatePassword(resBuilder, body);

      return resBuilder.build();
    },

    "GET api/favorites": (body): Response<FavoriteAllPatterns[]> => {
      const resBuilder = new ResponseBuilder<FavoriteAllPatterns[]>();
      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      const favoritesService = new FavoritesService();

      if (!PayloadValidators.favoriteGetPayload(resBuilder, body)) {
        return resBuilder.build();
      }

      favoritesService.getFromUser(resBuilder, body.pattern);

      return resBuilder.build();
    },

    "POST api/favorites": (body): Response<null> => {
      const resBuilder = new ResponseBuilder<null>();
      const favoritesService = new FavoritesService();
      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      if (!PayloadValidators.favoriteInsertPayload(resBuilder, body)) {
        return resBuilder.build();
      }

      favoritesService.addFavorite(resBuilder, body.productId);

      return resBuilder.build();
    },

    "DELETE api/favorites": (body): Response<null> => {
      const resBuilder = new ResponseBuilder<null>();
      if (!body) {
        return resBuilder.setError("BODY_NOT_FOUND").build();
      }

      const favoritesService = new FavoritesService();

      if (!PayloadValidators.favoriteRemovePayload(resBuilder, body)) {
        return resBuilder.build();
      }

      favoritesService.removeFavorite(resBuilder, body.productId);

      return resBuilder.build();
    },
  };
}

export { Main };
