const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 1);
expirationDate.setHours(0, 0, 0, 0);
const expiration = Math.floor(expirationDate.getTime() / 1000);

const salesFixtures = {
  sale: {
    id: "SAL-15AFC6",
    expected: {
      id: "SAL-15AFC6",
      name: "Festival das Placas de Vídeo",
      saleModifiers: [
        {
          productId: "PRO-026333169",
          expiration,
          discont: 10,
          salePrices: {
            full: 139990,
            pix: 131591,
            pixDiscont: 6,
            maxInstallments: 12,
            installments: 11666,
            previous: 155544,
          },
        },
        {
          productId: "PRO-688377899",
          expiration,
          discont: 10,
          salePrices: {
            full: 450000,
            pix: 423000,
            pixDiscont: 6,
            maxInstallments: 12,
            installments: 37500,
            previous: 499999,
          },
        },
        {
          productId: "PRO-002350C9D",
          expiration,
          discont: 15,
          salePrices: {
            full: 245555,
            pix: 230822,
            pixDiscont: 6,
            maxInstallments: 12,
            installments: 20463,
            previous: 288888,
          },
        },
        {
          productId: "PRO-2107D4DB3",
          expiration,
          discont: 15,
          salePrices: {
            full: 226667,
            pix: 213067,
            pixDiscont: 6,
            maxInstallments: 12,
            installments: 18889,
            previous: 266666,
          },
        },
        {
          productId: "PRO-9C0DAC9F7",
          expiration,
          discont: 10,
          salePrices: {
            full: 250000,
            pix: 235000,
            pixDiscont: 6,
            maxInstallments: 12,
            installments: 20834,
            previous: 277777,
          },
        },
        {
          productId: "PRO-E01929272",
          expiration,
          discont: 15,
          salePrices: {
            full: 245555,
            pix: 230822,
            pixDiscont: 6,
            maxInstallments: 12,
            installments: 20463,
            previous: 288888,
          },
        },
        {
          productId: "PRO-2FD400729",
          expiration,
          discont: 15,
          salePrices: {
            full: 623333,
            pix: 573467,
            pixDiscont: 8,
            maxInstallments: 12,
            installments: 51945,
            previous: 733332,
          },
        },
        {
          productId: "PRO-B7FA0718A",
          expiration,
          discont: 10,
          salePrices: {
            full: 409999,
            pix: 385400,
            pixDiscont: 6,
            maxInstallments: 12,
            installments: 34167,
            previous: 455554,
          },
        },
        {
          productId: "PRO-3709D4A9F",
          expiration,
          discont: 10,
          salePrices: {
            full: 399999,
            pix: 376000,
            pixDiscont: 6,
            maxInstallments: 12,
            installments: 33334,
            previous: 444443,
          },
        },
        {
          productId: "PRO-4E0235EDE",
          expiration,
          discont: 10,
          salePrices: {
            full: 469999,
            pix: 432400,
            pixDiscont: 8,
            maxInstallments: 12,
            installments: 39167,
            previous: 522221,
          },
        },
        {
          productId: "PRO-019F41CA9",
          expiration,
          discont: 10,
          salePrices: {
            full: 58224,
            pix: 53566,
            pixDiscont: 8,
            maxInstallments: 12,
            installments: 4852,
            previous: 64691,
          },
        },
        {
          productId: "PRO-AD8E593EB",
          expiration,
          discont: 15,
          salePrices: {
            full: 143149,
            pix: 134560,
            pixDiscont: 6,
            maxInstallments: 12,
            installments: 11929,
            previous: 168411,
          },
        },
      ],
    },
  },
  saleInCardFormat: {
    id: "SAL-15AFC6",
    expected: {
      id: "SAL-15AFC6",
      name: "Festival das Placas de Vídeo",
      products: [
        {
          id: "PRO-026333169",
          media: {
            thumb: "PRO-026333169-thumb.jpg",
          },
          name: "Placa de Vídeo Gigabyte RTX 3050 Windforce OC NVIDIA GeForce, 6GB, GDDR6, DLSS, Ray Tracing",
          prices: {
            full: 139990,
            installments: 11666,
            maxInstallments: 12,
            pix: 131591,
            pixDiscont: 6,
            previous: 155544,
          },
          sale: {
            discont: 10,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-688377899",
          media: {
            thumb: "PRO-688377899-thumb.jpg",
          },
          name: "Placa de Vídeo Gigabyte RTX 5070 WINDFORCE OC SFF 12G NVIDIA GeForce, 12GB GDDR7, 192bits, DLSS, Ray Tracing",
          prices: {
            full: 450000,
            installments: 37500,
            maxInstallments: 12,
            pix: 423000,
            pixDiscont: 6,
            previous: 499999,
          },
          sale: {
            discont: 10,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-002350C9D",
          media: {
            thumb: "PRO-002350C9D-thumb.jpg",
          },
          name: "Placa de Vídeo Gigabyte RTX 5060 WINDFORCE OC 8G NVIDIA GeForce, 8GB GDDR7, 128bits, DLSS, Ray Tracing",
          prices: {
            full: 245555,
            installments: 20463,
            maxInstallments: 12,
            pix: 230822,
            pixDiscont: 6,
            previous: 288888,
          },
          sale: {
            discont: 15,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-2107D4DB3",
          media: {
            thumb: "PRO-2107D4DB3-thumb.jpg",
          },
          name: "Placa de Vídeo RTX 4060 VENTUS 2x Black OC MSI NVIDIA GeForce, 8GB GDDR6, DLSS, Ray Tracing",
          prices: {
            full: 226667,
            installments: 18889,
            maxInstallments: 12,
            pix: 213067,
            pixDiscont: 6,
            previous: 266666,
          },
          sale: {
            discont: 15,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-9C0DAC9F7",
          media: {
            thumb: "PRO-9C0DAC9F7-thumb.jpg",
          },
          name: "Placa de Vídeo Gigabyte RTX 5060 GAMING OC 8G NVIDIA GeForce, 8GB GDDR7, 128bits, DLSS, Triple Fan, Ray Tracing",
          prices: {
            full: 250000,
            installments: 20834,
            maxInstallments: 12,
            pix: 235000,
            pixDiscont: 6,
            previous: 277777,
          },
          sale: {
            discont: 10,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-E01929272",
          media: {
            thumb: "PRO-E01929272-thumb.jpg",
          },
          name: "Placa de Vídeo ASUS DUAL RTX 5060 O8G NVIDIA GeForce, 8GB GDDR7, 2565MHz, 128 bits, OpenGL 4.6, DLSS 4, Ray Tracing",
          prices: {
            full: 245555,
            installments: 20463,
            maxInstallments: 12,
            pix: 230822,
            pixDiscont: 6,
            previous: 288888,
          },
          sale: {
            discont: 15,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-2FD400729",
          media: {
            thumb: "PRO-2FD400729-thumb.jpg",
          },
          name: "Placa de Vídeo Gigabyte RTX 5070 Ti WINDFORCE SFF 16G NVIDIA GeForce, 16GB, GDDR7, 256bits, DLSS, Ray Tracing",
          prices: {
            full: 623333,
            installments: 51945,
            maxInstallments: 12,
            pix: 573467,
            pixDiscont: 8,
            previous: 733332,
          },
          sale: {
            discont: 15,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-B7FA0718A",
          media: {
            thumb: "PRO-B7FA0718A-thumb.jpg",
          },
          name: "Placa de Vídeo MSI GeForce RTX 5070 12G VENTUS 2X OC,12 GB GDDR7, 28Gbps, NVIDIA GeForce RTX 5070",
          prices: {
            full: 409999,
            installments: 34167,
            maxInstallments: 12,
            pix: 385400,
            pixDiscont: 6,
            previous: 455554,
          },
          sale: {
            discont: 10,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-3709D4A9F",
          media: {
            thumb: "PRO-3709D4A9F-thumb.jpg",
          },
          name: "Placa de Vídeo ASUS DUAL RTX 5060 TI O16G NVIDIA GeForce, 16GB GDDR7, 2602MHz, 128 bits, OpenGL4.6, DLSS 4, Ray Tracing",
          prices: {
            full: 399999,
            installments: 33334,
            maxInstallments: 12,
            pix: 376000,
            pixDiscont: 6,
            previous: 444443,
          },
          sale: {
            discont: 10,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-4E0235EDE",
          media: {
            thumb: "PRO-4E0235EDE-thumb.jpg",
          },
          name: "Placa de Vídeo ASUS PRIME RTX 5070 O12G NVIDIA Geforce, 12GB, GDDR7, Blackwell e DLSS4, Ray Tracing, Edição OC",
          prices: {
            full: 469999,
            installments: 39167,
            maxInstallments: 12,
            pix: 432400,
            pixDiscont: 8,
            previous: 522221,
          },
          sale: {
            discont: 10,
            expiration,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-019F41CA9",
          media: {
            thumb: "PRO-019F41CA9-thumb.jpg",
          },
          name: "Placa de Vídeo RX 550 AMD PCYes Dual Fan Projeto Edge, 4GB GDDR5, 128 BITS",
          prices: {
            full: 58224,
            installments: 4852,
            maxInstallments: 12,
            pix: 53566,
            pixDiscont: 8,
            previous: 64691,
          },
          sale: {
            discont: 10,
            expiration: 1773975600,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
        {
          id: "PRO-AD8E593EB",
          media: {
            thumb: "PRO-AD8E593EB-thumb.jpg",
          },
          name: "Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6",
          prices: {
            full: 143149,
            installments: 11929,
            maxInstallments: 12,
            pix: 134560,
            pixDiscont: 6,
            previous: 168411,
          },
          sale: {
            discont: 15,
            expiration: 1773975600,
            id: "SAL-15AFC6",
            name: "Festival das Placas de Vídeo",
          },
        },
      ],
    },
  },
};

export { salesFixtures };
