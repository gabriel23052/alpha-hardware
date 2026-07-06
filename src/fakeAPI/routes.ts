import { ErrorMessages } from "./ErrorMessages";
import { FakeAPIResponse } from "./FakeAPIResponse";
import { Validations } from "./Validations";
import { HomepageHandler } from "./handlers/HomepageHandler";
import { ProductsHandler } from "./handlers/ProductsHandler";

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
      response.setError(ErrorMessages.PRODUCT_BY_ID_INVALID_ID);
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
      response.setError(ErrorMessages.PRODUCT_QUERY_INVALID);
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
      response.setError(ErrorMessages.PRODUCT_BY_ID_INVALID_ID);
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
};

export { routes };
