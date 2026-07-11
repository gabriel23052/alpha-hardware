import { FakeAPIResponse } from "./FakeAPIResponse";
import { Validations } from "./Validations";
import { HomepageHandler } from "./handlers/HomepageHandler";
import { ProductsHandler } from "./handlers/ProductsHandler";
import { SessionsHandler } from "./handlers/SessionsHandler";
import { UsersHandler } from "./handlers/UsersHandler";

const routes: Record<string, (params?: FARequestParameter) => FAResponse> = {
  "GET api/homepage/banners": (): FAResponse<FAHomepageBanners_Full> => {
    const homepageHandler = new HomepageHandler();
    const response = new FakeAPIResponse<FAHomepageBanners_Full>();
    homepageHandler.getHomepageBanners(response);
    return response.getResponse();
  },

  "GET api/homepage/sale": (): FAResponse<FASale_PrCard> => {
    const homepageHandler = new HomepageHandler();
    const response = new FakeAPIResponse<FASale_PrCard>();
    homepageHandler.getHomepageSale(response);
    return response.getResponse();
  },

  "GET api/homepage/collections":
    (): FAResponse<FAHomepageCollections_Full> => {
      const homepageHandler = new HomepageHandler();
      const response = new FakeAPIResponse<FAHomepageCollections_Full>();
      homepageHandler.getHomepageCollections(response);
      return response.getResponse();
    },

  "GET api/products/id": (params): FAResponse<FAProduct_Full> => {
    const productsHandler = new ProductsHandler();
    const response = new FakeAPIResponse<FAProduct_Full>();
    if (!params) {
      response.setError("PRODUCT_INVALID_ID");
      return response.getResponse();
    }
    if (!Validations.productById(response, params))
      return response.getResponse();
    productsHandler.getProductById(response, params.id);
    return response.getResponse();
  },

  "GET api/products/query": (params): FAResponse<FAProductFormats[]> => {
    const productsHandler = new ProductsHandler();
    const response = new FakeAPIResponse<FAProductFormats[]>();
    if (!params) {
      response.setError("PRODUCT_QUERY_INVALID");
      return response.getResponse();
    }
    if (!Validations.productQuery(response, params)) {
      return response.getResponse();
    }
    productsHandler.getByQuery(response, params);
    return response.getResponse();
  },

  "GET api/products/related": (params): FAResponse<FAProduct_Card[]> => {
    const productsHandler = new ProductsHandler();
    const response = new FakeAPIResponse<FAProduct_Card[]>();
    if (!params) {
      response.setError("PRODUCT_WITHOUT_ID");
      return response.getResponse();
    }
    if (!Validations.productById(response, params))
      return response.getResponse();
    productsHandler.getRelated(response, params.id);
    return response.getResponse();
  },

  "GET api/products/recentlyViewed": (): FAResponse<FAProduct_Card[]> => {
    const productsHandler = new ProductsHandler();
    const response = new FakeAPIResponse<FAProduct_Card[]>();
    productsHandler.getRecentlyViewed(response);
    return response.getResponse();
  },

  "POST api/auth/register": (params): FAResponse<FAUser_WithoutPassword> => {
    const usersHandler = new UsersHandler();
    const response = new FakeAPIResponse<FAUser_WithoutPassword>();

    if (!params) {
      response.setError("AUTH_REGISTER_PAYLOAD_NOT_FOUND");
      return response.getResponse();
    }

    if (!Validations.userCreationPayload(response, params))
      return response.getResponse();

    usersHandler.createUser(response, params);

    return response.getResponse();
  },

  "POST api/auth/login": (params): FAResponse<FAUser_WithoutPassword> => {
    const usersHandler = new UsersHandler();
    const response = new FakeAPIResponse<FAUser_WithoutPassword>();

    if (!params) {
      response.setError("AUTH_LOGIN_PAYLOAD_NOT_FOUND");
      return response.getResponse();
    }

    if (!Validations.loginPayload(response, params))
      return response.getResponse();

    usersHandler.login(response, params);

    return response.getResponse();
  },

  "POST api/auth/logout": (): FAResponse<null> => {
    const usersHandler = new UsersHandler();
    const response = new FakeAPIResponse<null>();

    usersHandler.logout();

    return response.getResponse();
  },

  "POST api/auth/verifySession": (): FAResponse<null> => {
    const sessionsHandler = new SessionsHandler();
    const response = new FakeAPIResponse<null>();
    sessionsHandler.verifySession(response);
    return response.getResponse();
  },

  "POST api/auth/recoverPassword": (params): FAResponse<null> => {
    const usersHandler = new UsersHandler();
    const response = new FakeAPIResponse<null>();

    if (!params) {
      response.setError("AUTH_RECOVER_PAYLOAD_NOT_FOUND");
      return response.getResponse();
    }

    if (!Validations.recoverPayload(response, params))
      return response.getResponse();

    usersHandler.recoverPassword(response, params);

    return response.getResponse();
  },
};

export { routes };
