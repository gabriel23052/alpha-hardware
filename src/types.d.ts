interface IResponsiveBanner {
  link: string;
  alt?: string;
  baseSrc: string;
  baseWidth: number;
  baseHeight: number;
  responsiveImages: {
    width: number;
    height: number;
    src: string;
  }[];
}

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

interface ISale {
  id: string;
  name: string;
  products: {
    id: string;
    expiration: number;
    discont: number;
    prices: IPrices;
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
    first: IResponsiveBanner;
    second: IResponsiveBanner;
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

interface IFakeApiResponse<T> {
  data: null | T;
  error: null | string;
}

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
