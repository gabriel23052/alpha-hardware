import { FakeAPIResponse } from "./FakeAPIResponse";
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

type RouteHandler = Record<string, (body?: FARequestBody) => FAResponse>;

const routes: RouteHandler = {
  "GET api/homepage/banners": (): FAResponse<HomepageBanners> => {
    const response = new FakeAPIResponse<HomepageBanners>();
    const homepageService = new HomepageService();
    homepageService.getBanners(response);
    return response.getResponse();
  },

  "GET api/homepage/sale": (): FAResponse<Sale["resolvedProducts"]> => {
    const response = new FakeAPIResponse<FASale_PrCard>();
    const homepageService = new HomepageService();
    homepageService.getSale(response);
    return response.getResponse();
  },

  "GET api/homepage/collections": (): FAResponse<HomepageCollections> => {
    const response = new FakeAPIResponse<HomepageCollections>();
    const homepageService = new HomepageService();
    homepageService.getCollections(response);
    return response.getResponse();
  },

  "GET api/products/id": (body): FAResponse<Product["default"]> => {
    const response = new FakeAPIResponse<Product["default"]>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const productsHandler = new ProductsService();
    if (!payloadValidators.productIdQuery(response, body)) {
      return response.getResponse();
    }

    productsHandler.getProductById(response, body.id);
    return response.getResponse();
  },

  "GET api/products/query": (body): FAResponse<ProductAllPatterns[]> => {
    const response = new FakeAPIResponse<ProductAllPatterns[]>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const productsHandler = new ProductsService();
    if (!payloadValidators.productQuery(response, body)) {
      return response.getResponse();
    }
    productsHandler.getByQuery(response, body);
    return response.getResponse();
  },

  "GET api/products/related": (body): FAResponse<FAProduct_Card[]> => {
    const response = new FakeAPIResponse<FAProduct_Card[]>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const productsHandler = new ProductsService();
    if (!payloadValidators.productIdQuery(response, body))
      return response.getResponse();
    productsHandler.getRelated(response, body.id);
    return response.getResponse();
  },

  "POST api/auth/register": (body): FAResponse<User["private"]> => {
    const response = new FakeAPIResponse<User["private"]>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const authService = new AuthService();

    if (!payloadValidators.authRegister(response, body)) {
      return response.getResponse();
    }

    authService.register(response, body);

    return response.getResponse();
  },

  "POST api/auth/login": (body): FAResponse<User["private"]> => {
    const response = new FakeAPIResponse<User["private"]>();

    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const authService = new AuthService();

    if (!payloadValidators.authLogin(response, body)) {
      return response.getResponse();
    }

    authService.login(response, body);

    return response.getResponse();
  },

  "POST api/auth/logout": (): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    const authService = new AuthService();

    authService.logout();

    return response.getResponse();
  },

  "POST api/auth/verifySession": (): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    const authService = new AuthService();

    authService.validateSession(response);

    return response.getResponse();
  },

  "POST api/auth/recoverPassword": (body): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();

    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const authService = new AuthService();

    if (!payloadValidators.authRecover(response, body)) {
      return response.getResponse();
    }

    authService.recover(response, body);

    return response.getResponse();
  },

  "POST api/auth/updatePassword": (body): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const authService = new AuthService();

    if (!payloadValidators.authUpdatePassword(response, body)) {
      return response.getResponse();
    }

    authService.updatePassword(response, body);

    return response.getResponse();
  },

  "GET api/favorites": (body): FAResponse<FavoriteAllPatterns[]> => {
    const response = new FakeAPIResponse<FavoriteAllPatterns[]>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const favoritesService = new FavoritesService();

    if (!payloadValidators.favoriteGet(response, body)) {
      return response.getResponse();
    }

    favoritesService.getFromUser(response, body.pattern);

    return response.getResponse();
  },

  "POST api/favorites": (body): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    const favoritesService = new FavoritesService();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    if (!payloadValidators.favoriteAdd(response, body)) {
      return response.getResponse();
    }

    favoritesService.addFavorite(response, body.productId);

    return response.getResponse();
  },

  "DELETE api/favorites": (body): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const favoritesService = new FavoritesService();

    if (!payloadValidators.favoriteRemove(response, body)) {
      return response.getResponse();
    }

    favoritesService.removeFavorite(response, body.productId);

    return response.getResponse();
  },
};

export { routes };
