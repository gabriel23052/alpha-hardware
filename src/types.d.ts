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

interface IProduct {
  id: string;
  name: string;
  price: number;
  cardPrice: number;
  maxInstallments: number;
  installmentsPrice: number;
  cashDiscount: number;
  sale: null | {
    discount: number;
    expiresAt: number;
    price: number;
    cardPrice: number;
    maxInstallments: number;
    installmentsPrice: number;
    oldPrice: number;
  };
  imagesSrc: {
    thumb: string;
  };
}
