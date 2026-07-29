export type Sale = {
  id: string;
  name: string;
  productModifiers: {
    productId: string;
    expiration: number;
    discont: number;
    price: SalePrice;
  }[];
};

type SalePrice = {
  full: number;
  pix: number;
  pixDiscont: number;
  maxInstallments: number;
  installments: number;
  previous: number;
};

type SaleProduct = {
  sale: {
    id: string;
    name: string;
    expiration: number;
    discont: number;
  };
  price: SalePrice;
};

const fakeExpiration = (() => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  expirationDate.setHours(0, 0, 0, 0);
  return Math.floor(expirationDate.getTime() / 1000);
})();

class SalesTable {
  public static data: Sale[] = [
    {
      id: "SAL-15AFC6",
      name: "Festival das Placas de Vídeo",
      productModifiers: [
        {
          productId: "PRO-026333169",
          expiration: fakeExpiration,
          discont: 10,
          price: {
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
          expiration: fakeExpiration,
          discont: 10,
          price: {
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
          expiration: fakeExpiration,
          discont: 15,
          price: {
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
          expiration: fakeExpiration,
          discont: 15,
          price: {
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
          expiration: fakeExpiration,
          discont: 10,
          price: {
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
          expiration: fakeExpiration,
          discont: 15,
          price: {
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
          expiration: fakeExpiration,
          discont: 15,
          price: {
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
          expiration: fakeExpiration,
          discont: 10,
          price: {
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
          expiration: fakeExpiration,
          discont: 10,
          price: {
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
          expiration: fakeExpiration,
          discont: 10,
          price: {
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
          expiration: fakeExpiration,
          discont: 10,
          price: {
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
          expiration: fakeExpiration,
          discont: 15,
          price: {
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
  ];

  public static saleProductMap = new Map<string, string[]>(
    this.data.map((s) => [
      s.id,
      s.productModifiers.map((spm) => spm.productId),
    ]),
  );

  public static productModifierMap = new Map<string, SaleProduct>(
    (() => {
      const arr: [string, SaleProduct][] = [];
      for (const sale of this.data) {
        for (const productModifier of sale.productModifiers) {
          arr.push([
            productModifier.productId,
            {
              sale: {
                id: sale.id,
                name: sale.name,
                discont: productModifier.discont,
                expiration: productModifier.expiration,
              },
              price: productModifier.price,
            },
          ]);
        }
      }
      return arr;
    })(),
  );
}

export { SalesTable };
