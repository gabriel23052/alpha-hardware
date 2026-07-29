const config = {
  maxResponseTime: 1000,
  minResponseTime: 500,
  homepage: {
    saleBannerId: "BAN-1AF1AC",
    adBannerId: "BAN-54C86E",
    saleId: "SAL-15AFC6",
    firstCollectionId: "COL-16C9A2",
    secondCollectionId: "COL-B6876C",
  },
  localStorageKeys: {
    users: "fakeAPI-users",
    sessions: "sessions",
    favorites: "fakeAPI-favorites",
    sessionFakeCookie: "fakeCookie-session",
  },
  validatorsRules: {
    productQuerySearchMaxLength: 200,
    productQuerySearchMinLength: 2,
    productQueryCategoryMaxLength: 30,
    productQueryCategoryMinLength: 2,
    productQueryMinPrice: 0,
    productQueryMaxPrice: 9999999,
    productQueryTagMaxLength: 30,
    productQueryTagMinLength: 2,
    productQueryMaxTagArraySize: 4,
    usernameMinLength: 3,
    usernameMaxLength: 30,
    passwordLength: 4,
  },
} as const;

export { config };
