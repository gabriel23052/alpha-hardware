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

type IProduct_Card = {
  id: string;
  name: string;
  prices: FAProductPrice;
  media: { thumb: string };
  sale?: {
    id: string;
    name: string;
    expiration: number;
    discont: number;
  };
};

type IProductPrice = {
  full: number;
  pix: number;
  pixDiscont: number;
  maxInstallments: number;
  installments: number;
  previous?: number;
};

type ISale = {
  id: string;
  name: string;
  products: IProduct_Card[];
};

// -----

interface IPrices {
  full: number;
  pix: number;
  pixDiscont: number;
  maxInstallments: number;
  installments: number;
  previous?: number;
}

interface IMedia {
  thumb: string;
  images: {
    small: string;
    medium: string;
  }[];
}

interface IProductSale {
  id: string;
  name: string;
  expiration: number;
  discont: number;
}

interface IProduct {
  id: string;
  name: string;
  category: string;
  prices: IPrices;
  sale?: IProductSale;
  media: IMedia;
  tags: string[];
}

interface IProductIdList {
  title: string;
  role: "default" | "sale";
  productIds: string[];
}

interface IProductGroup {
  meta?: {
    title?: string;
    saleName?: string;
    saleId?: string;
  };
  products: IProduct[];
}

type IProductIdGroup = Omit<IProductGroup, "products"> & {
  productIds: string[];
};

interface IHomePageContent {
  banners: {
    first: IBanner;
    second: IBanner;
  };
  productIdGroups: {
    sale: IProductIdGroup;
    first: IProductIdGroup;
    second: IProductIdGroup;
  };
}

interface IProductSuggestion {
  id: string;
  name: string;
}

interface IFreight {
  cep: string;
  options: {
    name: string;
    price: number;
    deliveryTime: number;
  }[];
}

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

type IFakeApiReqParams = Record<string, IFakeApiReqParam>;

type IFakeApiReqParam =
  | number
  | string
  | boolean
  | IFakeApiReqParam[]
  | { [key: string]: IFakeApiReqParam };

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
