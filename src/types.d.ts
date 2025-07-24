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

interface IProductIdSelection {
  title: string;
  role: "default" | "sale" | "recentlyViewed";
  productIds: string[];
}

interface IProductSelection {
  title: string;
  role: "default" | "sale" | "recentlyViewed";
  products: IProduct[];
}

interface IHomepage {
  banners: IResponsiveBanner[],
  productSelection: IProductIdSelection[]
}

interface IFreight {
  cep: string;
  options: {
    name: string;
    price: number;
    deliveryTime: number;
  }[]
}

