const banners: { [index: string]: IResponsiveBanner } = {
  gpusSale: {
    link: "/",
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
};

export default banners;
