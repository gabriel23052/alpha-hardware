const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 1);
expirationDate.setHours(0, 0, 0, 0);
const expiration = Math.floor(expirationDate.getTime() / 1000);

const sales: FASale[] = [
  {
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
    ],
  },
] as const;

const saleModifierMap = new Map<
  string,
  { id: string; name: string; modifier: FASaleModifier }
>();

for (const sale of sales) {
  for (const modifier of sale.saleModifiers) {
    saleModifierMap.set(modifier.productId, {
      id: sale.id,
      name: sale.name,
      modifier,
    });
  }
}

export { sales, saleModifierMap };
