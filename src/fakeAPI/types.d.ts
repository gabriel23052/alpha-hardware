type FAResponse<T = unknown> =
  | {
      success: true;
      data: T | null;
    }
  | {
      success: false;
      error: {
        message: string;
        userFriendly: boolean;
      };
    };

type FARecordData =
  | number
  | string
  | boolean
  | FARecordData[]
  | { [key: string]: FARecordData };

type FARecord = Record<string, FARecordData>;

type FAHomepageBanners_Default = {
  sale: FABanner;
  ad: FABanner;
};

type FAHomepageCollections_Default = {
  first: FACollection_Card;
  second: FACollection_Card;
};

type FABanner = {
  id: string;
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
type FABanner_Default = FABanner;

type FAProduct = {
  id: string;
  name: string;
  category: string;
  prices: FAProductPrice;
  media: FAProductMedia;
  tags: string[];
  sale?: {
    id: string;
    name: string;
    expiration: number;
    discont: number;
  };
};
type FAProduct_Default = FAProduct;
type FAProduct_Price = {
  id: string;
  pixPrice: number;
};
type FAProduct_Suggestion = Pick<FAProduct, "id" | "name">;
type FAProduct_Card = {
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
type FAProduct_Views =
  | FAProduct_Price
  | FAProduct_Default
  | FAProduct_Suggestion
  | FAProduct_Card;
type FAProduct_ViewsOptions = "default" | "price" | "card" | "suggestion";

type FAProductMedia = {
  thumb: string;
  images: {
    small: string;
    medium: string;
  }[];
};

type FAProductQuery = {
  filter: FAProductQueryFilter;
  view: "default" | "suggestion" | "card";
  sort?: FAProductSort;
};

type FAProductQueryFilter = {
  name?: string;
  saleId?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
};

type FAProductSort = "alphabetical" | "increasingPrice" | "decreasingPrice";

type FAProductPrice = {
  full: number;
  pix: number;
  pixDiscont: number;
  maxInstallments: number;
  installments: number;
  previous?: number;
};

type FACollection = {
  id: string;
  name: string;
  productsId: string[];
};
type FACollection_Card = {
  id: string;
  name: string;
  products: FAProduct_Card[];
};

type FASale = {
  id: string;
  name: string;
  saleModifiers: FASaleModifier[];
};
type FASale_Card = {
  id: string;
  name: string;
  products: FAProduct_Card[];
};

type FASaleModifier = {
  productId: string;
  expiration: number;
  discont: number;
  salePrices: FAProductPrice;
};
