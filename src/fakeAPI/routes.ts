import { ResponseBuilder } from "./ResponseBuilder";
import { payloadValidators } from "./payloadValidators";

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
import { AuthService } from "./services/AuthService";
import type { Sale } from "./tables/SalesTable";
import type { Product } from "./tables/ProductsTable";
import type { User } from "./queries/UsersQuery";
import type { Response } from "./ResponseBuilder";

type RouteHandler = Record<string, (body?: FARequestBody) => Response>;

const routes: RouteHandler = {
  "GET api/homepage/banners": (): Response<HomepageBanners> => {
    const resBuilder = new ResponseBuilder<HomepageBanners>();
    const homepageService = new HomepageService();
    homepageService.getBanners(resBuilder);
    return resBuilder.build();
  },

  "GET api/homepage/sale": (): Response<Sale["resolvedProducts"]> => {
    const resBuilder = new ResponseBuilder<FASale_PrCard>();
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
    if (!payloadValidators.productIdQuery(resBuilder, body)) {
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
    if (!payloadValidators.productQuery(resBuilder, body)) {
      return resBuilder.build();
    }
    productsHandler.getByQuery(resBuilder, body);
    return resBuilder.build();
  },

  "GET api/products/related": (body): Response<FAProduct_Card[]> => {
    const resBuilder = new ResponseBuilder<FAProduct_Card[]>();
    if (!body) {
      return resBuilder.setError("BODY_NOT_FOUND").build();
    }

    const productsHandler = new ProductsService();
    if (!payloadValidators.productIdQuery(resBuilder, body)) {
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

    if (!payloadValidators.authRegister(resBuilder, body)) {
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

    if (!payloadValidators.authLogin(resBuilder, body)) {
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

    if (!payloadValidators.authRecover(resBuilder, body)) {
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

    if (!payloadValidators.authUpdatePassword(resBuilder, body)) {
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

    if (!payloadValidators.favoriteGet(resBuilder, body)) {
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

    if (!payloadValidators.favoriteAdd(resBuilder, body)) {
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

    if (!payloadValidators.favoriteRemove(resBuilder, body)) {
      return resBuilder.build();
    }

    favoritesService.removeFavorite(resBuilder, body.productId);

    return resBuilder.build();
  },
};

export { routes };
