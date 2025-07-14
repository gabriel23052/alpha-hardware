const product: IProduct = {
  id: "2F9B652E8",
  name: "Processador Intel Core i7-12700K, 3.6GHz (5.0GHz Max Turbo), 12 Núcleos, 20 Threads, LGA 1700, Vídeo Integrado",
  category: "cpu",
  prices: {
    normal: 177777,
    withDiscont: 167110,
    discontPercentage: 6,
    maxInstallments: 12,
    installments: 14815,
  },
  sale: {
    name: "Festival das Placas de Vídeo",
    expiration: 1752619125 + 3600 * 90,
    discontPercentage: 10,
    prices: {
      normal: 139990,
      withDiscont: 131591,
      discontPercentage: 6,
      maxInstallments: 12,
      installments: 11666,
      oldPrice: 155544,
    },
  },
  media: {
    thumb: "2F9B652E8-thumb.jpg",
    images: [
      { small: "2F9B652E8-00-s.jpg", medium: "2F9B652E8-00-m.jpg" },
      { small: "2F9B652E8-01-s.jpg", medium: "2F9B652E8-01-m.jpg" },
      { small: "2F9B652E8-02-s.jpg", medium: "2F9B652E8-02-m.jpg" },
    ],
  },
};

export default product;
