const homepage: IHomePageContent = {
  banners: {
    first: {
      link: "/products?sale=2A0F24",
      baseSrc: "./img/banners/homeBanner.jpg",
      baseWidth: 3840,
      baseHeight: 200,
      alt: "Festival das Placas de Vídeo",
      responsiveImages: [
        {
          width: 768,
          height: 300,
          src: "./img/banners/homeBanner-768px.jpg",
        },
        {
          width: 1366,
          height: 250,
          src: "./img/banners/homeBanner-1366px.jpg",
        },
        {
          width: 1920,
          height: 200,
          src: "./img/banners/homeBanner-1920px.jpg",
        },
      ],
    },
    second: {
      link: "/",
      baseSrc: "./img/banners/cbxAd.jpg",
      baseWidth: 3840,
      baseHeight: 200,
      alt: "Festival das Placas de Vídeo",
      responsiveImages: [
        {
          width: 768,
          height: 400,
          src: "./img/banners/cbxAd-768px.jpg",
        },
        {
          width: 1366,
          height: 300,
          src: "./img/banners/cbxAd-1366px.jpg",
        },
        {
          width: 1920,
          height: 300,
          src: "./img/banners/cbxAd-1920px.jpg",
        },
      ],
    },
  },
  productIdGroups: {
    sale: {
      meta: {
        saleId: "2A0F24",
        saleName: "Festival das Placas de Vídeo",
      },
      productIds: [
        "026333169",
        "688377899",
        "002350C9D",
        "2107D4DB3",
        "9C0DAC9F7",
        "E01929272",
        "2FD400729",
        "B7FA0718A",
      ],
    },
    first: {
      meta: {
        title: "Festival das Placas de Vídeo",
      },
      productIds: [
        "D55645F74",
        "46FCACB03",
        "BDC286153",
        "FF124E82F",
        "460E13F00",
        "2FD400729",
        "03A80EEF0",
        "440F91D6E",
        "1534C6DB6",
        "7554C4CF6",
        "B447CB386",
        "816D1CD88",
        "A244D6ACD",
        "4E0235EDE",
        "A02EECCAA",
        "24B6D4F89",
        "91022DA09",
        "68C6F5693",
        "5065428A7",
        "81F2F1B97",
      ],
    },
    second: {
      meta: {
        title: "Chega de travamentos",
      },
      productIds: [
        "2F9B652E8",
        "A8D4D200D",
        "5065428A7",
        "7EDCF5AAF",
        "68C6F5693",
        "04AA22ED2",
        "6AF14669F",
        "2C450F25B",
        "A244D6ACD",
        "EA86C3F67",
        "17256E1C0",
        "CC5BF03BA",
        "3206A3A20",
        "91022DA09",
        "E060FA226",
        "9CA1977D6",
        "3F6BC274A",
        "D23C4039A",
        "3F0567CD0",
        "E48931615",
      ],
    },
  },
};

export default homepage;
