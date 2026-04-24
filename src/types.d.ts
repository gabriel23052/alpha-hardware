type IFakeApiReqParams = Record<string, IFakeApiReqParam>;

type IFakeApiReqParam =
  | number
  | string
  | boolean
  | IFakeApiReqParam[]
  | { [key: string]: IFakeApiReqParam };

type IFakeApiResponse<T = unknown> =
  | {
      success: true;
      data: T | null;
    }
  | {
      success: false;
      error: IFakeApiError;
    };

type IFakeApiError = {
  message: string;
  userFriendly: boolean;
};

type IBanner = {
  link: string;
  alt?: string;
  baseSrc: string;
  baseWidth: number;
  baseHeight: number;
  responsiveVersions: {
    width: number;
    height: number;
    src: string;
  }[];
};

type IProduct = {
  id: string;
  name: string;
  category: string;
  prices: IProductPrices;
  sale?: IProductSale;
  media: IProductMedia;
  tags: string[];
};

type IProduct_Full = IProduct;

type IProduct_Card = {
  id: string;
  name: string;
  prices: IProductPrices;
  media: { thumb: string };
  sale?: {
    id: string;
    name: string;
    expiration: number;
    discont: number;
  };
};

type IProduct_Suggestion = {
  id: string;
  name: string;
};

type IProductPrices = {
  full: number;
  pix: number;
  pixDiscont: number;
  maxInstallments: number;
  installments: number;
  previous?: number;
};

type IProductSale = {
  id: string;
  name: string;
  expiration: number;
  discont: number;
};

type IProductMedia = {
  thumb: string;
  images: {
    small: string;
    medium: string;
  }[];
};

type ISale = {
  id: string;
  name: string;
  products: IProduct_Card[];
};

type IProductCollection = {
  id: string;
  name: string;
  products: IProduct_Card[];
};

interface IFreight {
  cep: string;
  options: {
    name: string;
    price: number;
    deliveryTime: number;
  }[];
}

// -----

interface IFakeApiProductFilter {
  id?: string | string[];
  name?: string;
  sale?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  sortBy?: "increasingPrice" | "decreasingPrice";
}
