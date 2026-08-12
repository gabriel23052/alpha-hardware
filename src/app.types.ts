export type TBanner = {
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

export type TProduct = {
  default: {
    id: string;
    name: string;
    searchName: string;
    category: string;
    price: TProductPrice;
    sale?: TProductSale;
    media: TProductMedia;
    tags: string[];
    description: string;
    specs: [string, string][];
  };
  card: {
    id: string;
    name: string;
    price: TProductPrice;
    media: { thumb: string };
    sale?: {
      id: string;
      name: string;
      expiration: number;
      discont: number;
    };
  };
  suggestion: {
    id: string;
    name: string;
    searchName: string;
  };
};

export type TProductPatterns = "default" | "card" | "suggestion";

export type TProductPrice = {
  full: number;
  pix: number;
  pixDiscont: number;
  maxInstallments: number;
  installments: number;
  previous?: number;
};

export type TProductMedia = {
  thumb: string;
  images: {
    small: string;
    medium: string;
  }[];
};

export type TProductSale = {
  id: string;
  name: string;
  expiration: number;
  discont: number;
};

export type TCatalogQuery = {
  filter: TCatalogFilter;
  pattern: TProductPatterns;
  sort?: TCatalogSorts;
};

export type TCatalogFilter = {
  search?: string;
  saleId?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
};

export type TCatalogSorts =
  | "alphabetical"
  | "increasingPrice"
  | "decreasingPrice";

export type TCollection = {
  id: string;
  name: string;
  products: TProduct["card"][];
};

export type TSale = {
  id: string;
  name: string;
  products: TProduct["card"][];
};

export type TFreight = {
  cep: string;
  options: {
    name: string;
    price: number;
    deliveryTime: number;
  }[];
};

export type TUser = {
  id: string;
  username: string;
};
