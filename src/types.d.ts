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
  normal: number;
  withDiscont: number;
  discontPercentage: number;
  maxInstallments: number;
  installments: number;
  oldPrice?: number;
}

interface IMedia {
  thumb: string;
  images: {
    small: string;
    medium: string;
  }[];
}

interface ISale {
  name: string;
  expiration: number;
  discontPercentage: number;
  prices: IPrices;
}

interface IProduct {
  id: string;
  name: string;
  category: string;
  prices: IPrices;
  sale: null | ISale;
  media: IMedia;
  tags: string[];
}

interface IProductIdList {
  title: string;
  role: "default" | "sale" | "recentlyViewed";
  productIds: string[];
}

interface IProductList {
  title: string;
  role: "default" | "sale";
  products: IProduct[];
}

interface IHomePageContent {
  banners: {
    first: IResponsiveBanner;
    second: IResponsiveBanner;
  };
  productIdLists: {
    sale: IProductIdList;
    first: IProductIdList;
    second: IProductIdList;
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

type IJsonValue = string | number | boolean | null | IJsonValue[] | Record<string, unknown>;

interface IFormField<T extends IJsonValue> {
  value: T;
  error: string | null;
}

interface IFakeApiResponse<T> {
  data: null | T;
  error: null | string;
}

interface IFakeApiProductFilter {
  id?: string;
  name?: string;
  sale?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
}
