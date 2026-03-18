const config = {
  maxResponseTime: 1000,
  minResponseTime: 500,
  homepage: {
    saleBannerId: "BAN-1AF1AC",
    adBannerId: "BAN-54C86E",
    saleId: "SAL-15AFC6",
    firstCollectionId: "COL-16C9A2",
    secondCollectionId: "COL-16C9A2",
  },
  validationsRules: {
    productQueryNameMaxLength: 200,
    productQueryNameMinLength: 2,
    productQueryCategoryMaxLength: 30,
    productQueryCategoryMinLength: 2,
    productQueryMinPrice: 0,
    productQueryMaxPrice: 9999999,
    productQueryTagMaxLength: 30,
    productQueryTagMinLength: 2,
    productQueryMaxTagArraySize: 4,
  },
} as const;

export { config };
