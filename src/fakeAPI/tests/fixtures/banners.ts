const bannersFixtures = {
  banner: {
    id: "BAN-1AF1AC",
    expected: {
      id: "BAN-1AF1AC",
      link: "/products?sale=2A0F24",
      baseSrc: "./img/banners/BAN-1AF1AC.jpg",
      baseWidth: 3840,
      baseHeight: 200,
      alt: "Festival das Placas de Vídeo",
      responsiveVersions: [
        {
          width: 768,
          height: 300,
          src: "./img/banners/BAN-1AF1AC-768px.jpg",
        },
        {
          width: 1366,
          height: 250,
          src: "./img/banners/BAN-1AF1AC-1366px.jpg",
        },
        {
          width: 1920,
          height: 200,
          src: "./img/banners/BAN-1AF1AC-1920px.jpg",
        },
      ],
    },
  },
  bannerInfullFormat: {
    id: "BAN-54C86E",
    expected: {
      id: "BAN-54C86E",
      link: "/",
      baseSrc: "./img/banners/BAN-54C86E.jpg",
      baseWidth: 3840,
      baseHeight: 200,
      alt: "Publicidade: CBX Light PRO 500",
      responsiveVersions: [
        {
          width: 768,
          height: 400,
          src: "./img/banners/BAN-54C86E-768px.jpg",
        },
        {
          width: 1366,
          height: 300,
          src: "./img/banners/BAN-54C86E-1366px.jpg",
        },
        {
          width: 1920,
          height: 300,
          src: "./img/banners/BAN-54C86E-1920px.jpg",
        },
      ],
    },
  },
} as const;

export { bannersFixtures };
