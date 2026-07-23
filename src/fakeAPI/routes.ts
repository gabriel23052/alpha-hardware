import { FakeAPIResponse } from "./FakeAPIResponse";
import { Validations } from "./Validations";

import { FavoritesHandler } from "./handlers/FavoritesHandler";
import { HomepageHandler } from "./handlers/HomepageHandler";
import { ProductsHandler } from "./handlers/ProductsHandler";
import { SessionsHandler } from "./handlers/SessionsHandler";
import { UsersHandler } from "./handlers/UsersHandler";

type RouteHandler = Record<string, (body?: FARequestBody) => FAResponse>;

const routes: RouteHandler = {
  "GET api/homepage/banners": (): FAResponse<FAHomepageBanners_Full> => {
    const response = new FakeAPIResponse<FAHomepageBanners_Full>();
    const homepageHandler = new HomepageHandler();
    homepageHandler.getHomepageBanners(response);
    return response.getResponse();
  },

  "GET api/homepage/sale": (): FAResponse<FASale_PrCard> => {
    const response = new FakeAPIResponse<FASale_PrCard>();
    const homepageHandler = new HomepageHandler();
    homepageHandler.getHomepageSale(response);
    return response.getResponse();
  },

  "GET api/homepage/collections":
    (): FAResponse<FAHomepageCollections_Full> => {
      const response = new FakeAPIResponse<FAHomepageCollections_Full>();
      const homepageHandler = new HomepageHandler();
      homepageHandler.getHomepageCollections(response);
      return response.getResponse();
    },

  "GET api/products/id": (body): FAResponse<FAProduct_Full> => {
    const response = new FakeAPIResponse<FAProduct_Full>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const productsHandler = new ProductsHandler();
    if (!Validations.productById(response, body)) return response.getResponse();
    productsHandler.getProductById(response, body.id);
    return response.getResponse();
  },

  "GET api/products/query": (body): FAResponse<FAProductFormats[]> => {
    const response = new FakeAPIResponse<FAProductFormats[]>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const productsHandler = new ProductsHandler();
    if (!Validations.productQuery(response, body)) {
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

    const productsHandler = new ProductsHandler();
    if (!Validations.productById(response, body)) return response.getResponse();
    productsHandler.getRelated(response, body.id);
    return response.getResponse();
  },

  "POST api/auth/register": (body): FAResponse<FAUser_WithoutPassword> => {
    const response = new FakeAPIResponse<FAUser_WithoutPassword>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const usersHandler = new UsersHandler();

    if (!Validations.userCreationPayload(response, body))
      return response.getResponse();

    usersHandler.createUser(response, body);

    return response.getResponse();
  },

  "POST api/auth/login": (body): FAResponse<FAUser_WithoutPassword> => {
    const response = new FakeAPIResponse<FAUser_WithoutPassword>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const usersHandler = new UsersHandler();

    if (!Validations.loginPayload(response, body))
      return response.getResponse();

    usersHandler.login(response, body);

    return response.getResponse();
  },

  "POST api/auth/logout": (): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    const usersHandler = new UsersHandler();

    usersHandler.logout();

    return response.getResponse();
  },

  "POST api/auth/verifySession": (): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    const sessionsHandler = new SessionsHandler();
    sessionsHandler.isAuthenticated(response);
    return response.getResponse();
  },

  "POST api/auth/recoverPassword": (body): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const usersHandler = new UsersHandler();

    if (!Validations.recoverPayload(response, body))
      return response.getResponse();

    usersHandler.recoverPassword(response, body);

    return response.getResponse();
  },

  "POST api/auth/updatePassword": (body): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const usersHandler = new UsersHandler();

    if (!Validations.updatePasswordPayload(response, body))
      return response.getResponse();

    usersHandler.updatePassword(response, body);

    return response.getResponse();
  },

  "GET api/favorites": (body): FAResponse<string[] | FAProduct_Card[]> => {
    const response = new FakeAPIResponse<string[] | FAProduct_Card[]>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const favoritesHandler = new FavoritesHandler();

    if (!Validations.favoriteGet(response, body)) return response.getResponse();

    favoritesHandler.getFromUser(response, body.format);

    return response.getResponse();
  },

  "POST api/favorites": (body): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    const favoritesHandler = new FavoritesHandler();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    if (!Validations.favoritePostOrDelete(response, body))
      return response.getResponse();

    favoritesHandler.addFavorite(response, body.productId);

    return response.getResponse();
  },

  "DELETE api/favorites": (body): FAResponse<null> => {
    const response = new FakeAPIResponse<null>();
    if (!body) {
      response.setError("BODY_NOT_FOUND");
      return response.getResponse();
    }

    const favoritesHandler = new FavoritesHandler();

    if (!Validations.favoritePostOrDelete(response, body))
      return response.getResponse();

    favoritesHandler.removeFavorite(response, body.productId);

    return response.getResponse();
  },
};

export { routes };
