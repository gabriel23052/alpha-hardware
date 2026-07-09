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

type FARequestParameterData =
  | number
  | string
  | boolean
  | FARequestParameterData[]
  | { [key: string]: FARequestParameterData };

type FARequestParameter = Record<string, FARequestParameterData>;

type FAHomepageBanners_Full = {
  sale: FABanner;
  ad: FABanner;
};

type FAHomepageCollections_Full = {
  first: FACollection_PrCard;
  second: FACollection_PrCard;
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
type FABanner_Full = FABanner;

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
  description: string;
  specs: [string, string][];
};
type FAProduct_Full = FAProduct;
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

type FAProductFormats =
  | FAProduct_Price
  | FAProduct_Full
  | FAProduct_Suggestion
  | FAProduct_Card;

type FAProductFormatOptions = "full" | "price" | "card" | "suggestion";

type FAProductMedia = {
  thumb: string;
  images: {
    small: string;
    medium: string;
  }[];
};

type FAProductQuery = {
  filter: FAProductFilter;
  format: FAProductFormatOptions;
  sort?: FAProductSort;
};

type FAProductFilter = {
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
type FACollection_PrCard = {
  id: string;
  name: string;
  products: FAProduct_Card[];
};

type FASale = {
  id: string;
  name: string;
  saleModifiers: FASaleModifier[];
};
type FASale_PrCard = {
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

type FAUser = {
  id: string;
  username: string;
  password: string;
};
type FAUser_Complete = FAUser;
type FAUser_WithoutPassword = Omit<FAUser, "password">;

type FAUserCreationPayload = {
  username: string;
  password: string;
};

type FALoginPayload = {
  username: string;
  password: string;
};

type FASession = {
  id: string;
  userId: string;
  startedAt: number;
};
