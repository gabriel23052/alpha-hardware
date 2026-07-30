import { beforeEach, describe, expect, it, test, vi } from "vitest";

import { isRequestBody } from "@fakeAPI/isRequestBody";
import { primitiveValidators } from "@fakeAPI/primitiveValidators";
import { payloadValidators } from "@fakeAPI/payloadValidators";
import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { ProductsQuery } from "@fakeAPI/queries/ProductsQuery";
import { SalesQuery } from "@fakeAPI/queries/SalesQuery";
import { BannersQuery } from "@fakeAPI/queries/BannersQuery";
import { CollectionsQuery } from "@fakeAPI/queries/CollectionsQuery";
import { SessionsQuery } from "@fakeAPI/queries/SessionsQuery";
import { UsersQuery } from "@fakeAPI/queries/UsersQuery";
import { FavoritesQuery } from "@fakeAPI/queries/FavoritesQuery";
import {
  type HomepageBanners,
  type HomepageCollections,
  HomepageService,
} from "@fakeAPI/services/HomepageService";
import type { Sale } from "@fakeAPI/tables/SalesTable";

describe("Validações de corpo de requisição", () => {
  test.each([
    ["atributo do tipo string", { prop: "value" }],
    ["atributo do tipo number", { prop: 1 }],
    ["atributo do tipo boolean", { prop: false }],
    ["atributo null", { prop: null }],
    ["atributo contendo array", { prop: [1, 2, 3] }],
    [
      "atributo contendo record",
      {
        prop: {
          propA: "value",
        },
      },
    ],
    [
      "atributo com array contendo outros arrays",
      {
        propA: [
          [1, 2, 3],
          ["a", "b", "c"],
          [
            [1, 2, 3],
            ["a", "b", "c"],
          ],
        ],
      },
    ],
    [
      "atributo com record contendo outros records",
      {
        propA: {
          propAA: {
            propAAA: "value",
          },
          propAB: "value",
        },
      },
    ],
    [
      "atributos de múltiplos tipos",
      {
        propA: "value",
        propB: 1,
        propC: false,
        propD: [1, 2, 3],
        propE: {
          propEA: "value",
        },
        propF: [[1, 2, 3]],
        propG: {
          propGA: {
            propGAA: "value",
          },
        },
      },
    ],
  ])("aceita com %s", (_, body) => {
    expect(isRequestBody(body)).toBe(true);
  });

  test.each([
    ["for um number", 1],
    ["for um boolean", true],
    ["for uma string", "invalid"],
    ["for null", null],
    ["for undefined", undefined],
    ["for um array", [1]],
    ["for um objeto vazio", {}],
    ["for uma função", () => "a"],
    [
      "conter um atributo undefined",
      {
        propA: undefined,
      },
    ],
    [
      "conter um array que contem uma função",
      {
        propA: [() => "abc"],
      },
    ],
    [
      "conter um record que contem uma função",
      {
        propA: {
          propAA: () => "abc",
        },
      },
    ],
    [
      "conter um array que contem undefined",
      {
        propA: [undefined],
      },
    ],
    [
      "conter um record que contem undefined",
      {
        propA: {
          propAA: undefined,
        },
      },
    ],
  ])("rejeita se o corpo %s", (_, body) => {
    expect(isRequestBody(body)).toBe(false);
  });
});

describe("Validações primitivas", () => {
  describe("Tipagem", () => {
    const validatorsThatExpectString = [
      "productId",
      "saleId",
      "productFilterSearch",
      "productFilterCategory",
      "productFilterTag",
      "productFormat",
      "productSort",
      "username",
      "password",
      "favoriteFormat",
    ] as const;

    const validatorsThatExpectNumber = ["productFilterPrice"] as const;

    describe("Esperam string", () => {
      test.each(validatorsThatExpectString)(
        "%s rejeita valores que não são string",
        (v) => {
          const validator = primitiveValidators[v];
          expect(validator(123)).toBe(false);
          expect(validator(true)).toBe(false);
          expect(validator(null)).toBe(false);
          expect(validator(["abc"])).toBe(false);
          expect(validator({ prop: "abc" })).toBe(false);
        },
      );
    });

    describe("Esperam number", () => {
      test.each(validatorsThatExpectNumber)(
        "%s rejeita valores que não são number",
        (v) => {
          const validator = primitiveValidators[v];
          expect(validator("abc")).toBe(false);
          expect(validator(true)).toBe(false);
          expect(validator(null)).toBe(false);
          expect(validator([123])).toBe(false);
          expect(validator({ prop: 123 })).toBe(false);
        },
      );
    });
  });

  describe("Valores", () => {
    describe("ID de produto", () => {
      test.each([
        ["apenas com números", "PRO-123456789"],
        ["apenas com letras", "PRO-ABCDEFABC"],
        ["com letras e números", "PRO-ABC123456"],
      ])("aceita se testar um ID hexadecimal %s", (_, value) => {
        expect(primitiveValidators.productId(value)).toBe(true);
      });

      test.each([
        ["vazio", ""],
        ["com espaços no ínicio", " PRO-123456789"],
        ["com espaços no fim", "PRO-123456789 "],
        ["com espaços no ínicio e no fim", " PRO-123456789 "],
        ["com espaço no meio", " PRO -123456789 "],
        ["sem o prefixo", "123456789"],
        ["com préfixo incorreto", "PRA-123456789"],
        ["com préfixo com letras minúsculas", "pro-ABC123"],
        ["com letras minúsculas", "PRO-abc123456"],
        ["com letras fora do range hexadecimal", "PRO-ABCDEFG12"],
        ["com caracteres faltando", "PRO-12345678"],
        ["com caracteres sobrando", "PRO-123456789A"],
      ])("rejeita se testar um ID %s", (_, value) => {
        expect(primitiveValidators.productId(value)).toBe(false);
      });
    });

    describe("ID de promoção", () => {
      test.each([
        ["apenas com números", "SAL-123456"],
        ["apenas com letras", "SAL-ABCDEF"],
        ["com letras e números", "SAL-ABC123"],
      ])("aceita se testar um ID hexadecimal %s", (_, value) => {
        expect(primitiveValidators.saleId(value)).toBe(true);
      });

      test.each([
        ["vazio", ""],
        ["com espaços no ínicio", " SAL-123456"],
        ["com espaços no fim", "SAL-123456 "],
        ["com espaços no ínicio e no fim", " SAL-123456 "],
        ["com espaço no meio", " SAL- 123456 "],
        ["sem o prefixo", "123456"],
        ["com letras minúsculas", "SAL-abc123"],
        ["com préfixo incorreto", "SAA-ABC123"],
        ["com préfixo com letras minúsculas", "sal-ABC123"],
        ["com letras fora do range hexadecimal", "SAL-ABCDEG"],
        ["com caracteres faltando", "SAL-12345"],
        ["com caracteres sobrando", "SAL-1234567"],
      ])("rejeita se testar um id %s", (_, value) => {
        expect(primitiveValidators.saleId(value)).toBe(false);
      });
    });

    describe("Filtro de produto: Pesquisa", () => {
      test.each([
        ["2 caracteres", "ab"],
        ["200 caracteres", Array(200).fill("a").join("")],
      ])("aceita se testar uma pesquisa com %s", (_, value) => {
        expect(primitiveValidators.productFilterSearch(value)).toBe(true);
      });

      test.each([
        ["vazia", ""],
        ["com espaço no ínicio", " abcde"],
        ["com espaço no fim", "abcde "],
        ["com espaços no ínicio e no fim", " abcde "],
        ["com 1 caractere", "a"],
        ["com 201 caracteres", Array(201).fill("a").join("")],
      ])("rejeita se testar uma pesquisa %s", (_, value) => {
        expect(primitiveValidators.productFilterSearch(value)).toBe(false);
      });
    });

    describe("Filtro de produto: Preço", () => {
      test.each([
        ["R$ 0,00", 0],
        ["R$ 99999,99", 9999999],
      ])("aceita se testar um preço de %s", (_, value) => {
        expect(primitiveValidators.productFilterPrice(value)).toBe(true);
      });

      test.each([
        ["negativo", -1],
        ["maior que R$99.999,99", 10000000],
        ["decimal", 123.25],
      ])("rejeita se testar um preço %s", (_, value) => {
        expect(primitiveValidators.productFilterPrice(value)).toBe(false);
      });
    });

    describe("Filtro de produto: Tag", () => {
      test.each([
        ["2 caracteres", "ab"],
        ["30 caracteres", Array(30).fill("a").join("")],
      ])("aceita se testar uma tag com %s", (_, value) => {
        expect(primitiveValidators.productFilterTag(value)).toBe(true);
      });

      test.each([
        ["vazia", ""],
        ["com espaço no ínicio", " abcde"],
        ["com espaço no fim", "abcde "],
        ["com espaços no ínicio e no fim", " abcde "],
        ["com 1 caracter", "a"],
        ["com 31 caracteres", Array(31).fill("a").join("")],
      ])("rejeita se testar uma tag %s", (_, value) => {
        expect(primitiveValidators.productFilterTag(value)).toBe(false);
      });
    });

    describe("Formato de produto", () => {
      test.each([
        ["'full'", "full"],
        ["'price'", "price"],
        ["'suggestion'", "suggestion"],
        ["'card'", "card"],
      ])("aceita se testar o formato %s", (_, value) => {
        expect(primitiveValidators.productFormat(value)).toBe(true);
      });

      test.each([
        ["vazio", ""],
        ["com espaço no ínicio", " full"],
        ["com espaço no fim", "full "],
        ["com espaços no ínicio e no fim", " full "],
        ["com espaço no meio", "increasing Price"],
        ["com letras maíusculas", "FULL"],
      ])("rejeita se testar um formato %s", (_, value) => {
        expect(primitiveValidators.productFormat(value)).toBe(false);
      });
    });

    describe("Ordenamento de produto", () => {
      test.each([
        ["'increasingPrice'", "increasingPrice"],
        ["'decreasingPrice'", "decreasingPrice"],
        ["'alphabetical'", "alphabetical"],
      ])("aceita se testar o ordenamento %s", (_, value) => {
        expect(primitiveValidators.productSort(value)).toBe(true);
      });

      test.each([
        ["espaço no ínicio", " increasingPrice"],
        ["espaço no fim", "increasingPrice "],
        ["espaços no ínicio e no fim", " increasingPrice "],
        ["espaço no meio", "increasing Price"],
        ["letras maíusculas", "INCREASINGPRICE"],
      ])("rejeita se testar um ordenamento com %s", (_, value) => {
        expect(primitiveValidators.productSort(value)).toBe(false);
      });
    });

    describe("Nome de usuário", () => {
      test.each([
        ["apenas com letras", "username"],
        ["apenas com números", "123456"],
        ["com letras e números", "username123"],
        ["com espaços", "username 123"],
        ["com 3 caracteres", "usr"],
        ["com 30 caracteres", Array(30).fill("a").join("")],
      ])("aceita se testar o nome de usuário %s", (_, value) => {
        expect(primitiveValidators.username(value)).toBe(true);
      });

      test.each([
        ["vazio", ""],
        ["com espaço no ínicio", " username"],
        ["com espaço no fim", "username "],
        ["com espaços no ínicio e no fim", " username "],
        ["com 2 caracteres", "us"],
        ["com 31 caracteres", Array(31).fill("a").join("")],
        ["com traços", "username-abc"],
        ["com acentuações", "usérnãme"],
        ["com underline", "_username"],
        ["com outros caracteres especiais", "username_$^][{}()="],
      ])("rejeita se testar um nome de usuário %s", (_, value) => {
        expect(primitiveValidators.username(value)).toBe(false);
      });
    });

    describe("Senha", () => {
      test.each([["com quatro números", "1234"]])(
        "aceita se testar uma senha %s",
        (_, value) => {
          expect(primitiveValidators.password(value)).toBe(true);
        },
      );

      test.each([
        ["vazia", ""],
        ["com espaço no ínicio", " 1234"],
        ["com espaço no fim", "1234 "],
        ["com espaços no ínicio e no fim", " 1234 "],
        ["com espaço no meio", "12 4"],
        ["com 3 caracteres", "123"],
        ["com 5 caracteres", "12345"],
        ["com letras", "a123"],
      ])("rejeita se testar uma senha %s", (_, value) => {
        expect(primitiveValidators.password(value)).toBe(false);
      });
    });

    describe("Formato de favorito", () => {
      test.each([
        ["onlyIds", "onlyIds"],
        ["products", "products"],
      ])("aceita se testar o formato de favorito '%s'", (_, value) => {
        expect(primitiveValidators.favoriteFormat(value)).toBe(true);
      });

      test.each([
        ["vazio", ""],
        ["com espaço no ínicio", " onlyIds"],
        ["com espaço no fim", "onlyIds "],
        ["com espaços no ínicio e no fim", " onlyIds "],
        ["com espaço no meio", "only Ids"],
        ["com letras maíusculas", "PRODUCTS"],
      ])("rejeita se testar um formato de favorito %s", (_, value) => {
        expect(primitiveValidators.favoriteFormat(value)).toBe(false);
      });
    });
  });
});

describe("Validações de payloads", () => {
  describe("Busca de produto por ID", () => {
    test.each([
      [
        "conter um id de produto válido",
        {
          id: "PRO-123456789",
        },
      ],
    ])("aceita se %s", (_, value) => {
      const response = new FakeAPIResponse();
      expect(payloadValidators.productIdQuery(response, value)).toBe(true);
    });

    test.each([
      {
        description: "for um objeto vazio",
        value: {},
        error: "PRODUCT_ID_QUERY_ID_FIELD_NOT_FOUND",
      },
      {
        description: "conter um id de produto inválido",
        value: {
          id: "PRO-123456789A",
        },
        error: "PRODUCT_ID_QUERY_INVALID_ID",
      },
    ])("rejeita se $description", ({ value, error }) => {
      const response = new FakeAPIResponse();
      expect(
        payloadValidators.productIdQuery(response, value as FARequestBody),
      ).toBe(false);
      const responseData = response.getResponse();
      expect(responseData.success).toBe(false);
      if (!responseData.success) expect(responseData.error.id).toBe(error);
    });
  });

  describe("Busca de produto por consulta", () => {
    test.each([
      [
        "conter uma busca válida sem ordenamento",
        {
          format: "full",
          filter: {
            search: "product",
          },
        },
      ],
      [
        "conter uma busca válida com ordenamento",
        {
          format: "full",
          filter: {
            search: "product",
          },
          sort: "increasingPrice",
        },
      ],
      [
        "conter uma busca válida com múltiplos filtros e ordenamento",
        {
          format: "full",
          filter: {
            search: "product",
            saleId: "SAL-123456",
            minPrice: 20000,
            maxPrice: 80000,
            category: "cat",
            tags: ["tagA", "tagB"],
          },
          sort: "increasingPrice",
        },
      ],
    ])("aceita se %s", (_, value) => {
      const response = new FakeAPIResponse();
      expect(payloadValidators.productQuery(response, value)).toBe(true);
    });

    test.each([
      {
        description: "for um objeto vazio",
        value: {},
        error: "PRODUCT_QUERY_FILTER_FIELD_NOT_FOUND",
      },
      {
        description: "não conter formato",
        value: {
          filter: {
            search: "product",
          },
        },
        error: "PRODUCT_QUERY_FORMAT_FIELD_NOT_FOUND",
      },
      {
        description: "conter filtro vazio",
        value: {
          filter: {},
          format: "full",
        },
        error: "PRODUCT_QUERY_EMPTY_FILTER",
      },
      {
        description: "o filtro for um number",
        value: {
          filter: 123,
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_FILTER",
      },
      {
        description: "o filtro for uma string",
        value: {
          filter: "invalid",
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_FILTER",
      },
      {
        description: "o filtro for um boolean",
        value: {
          filter: "invalid",
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_FILTER",
      },
      {
        description: "o filtro for um array",
        value: {
          filter: ["invalid"],
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_FILTER",
      },
      {
        description: "o filtro conter uma busca inválida",
        value: {
          filter: {
            search: "a",
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_SEARCH",
      },
      {
        description: "o filtro conter um id de promoção inválido",
        value: {
          filter: {
            saleId: "a",
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_SALE_ID",
      },
      {
        description: "o filtro conter uma categoria inválida",
        value: {
          filter: {
            category: "a",
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_CATEGORY",
      },
      {
        description: "o filtro conter um preço mínimo inválido",
        value: {
          filter: {
            minPrice: -1,
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_MIN_PRICE",
      },
      {
        description: "o filtro conter um preço máximo inválido",
        value: {
          filter: {
            maxPrice: 99999999,
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_MAX_PRICE",
      },
      {
        description: "o filtro conter tags em forma de number",
        value: {
          filter: {
            tags: 123,
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_TAGS",
      },
      {
        description: "o filtro conter tags em forma de string",
        value: {
          filter: {
            tags: "invalid",
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_TAGS",
      },
      {
        description: "o filtro conter tags em forma de boolean",
        value: {
          filter: {
            tags: true,
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_TAGS",
      },
      {
        description: "o filtro conter tags em forma de objeto",
        value: {
          filter: {
            tags: {
              prop: "tag",
            },
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_TAGS",
      },
      {
        description: "o filtro conter um array de numbers",
        value: {
          filter: {
            tags: [123],
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_TAGS",
      },
      {
        description: "o filtro conter um array de booleans",
        value: {
          filter: {
            tags: [true],
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_TAGS",
      },
      {
        description: "o filtro conter um array de arrays",
        value: {
          filter: {
            tags: [["tag"]],
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_TAGS",
      },
      {
        description: "o filtro conter tags inválidas",
        value: {
          filter: {
            tags: ["a"],
          },
          format: "full",
        },
        error: "PRODUCT_QUERY_INVALID_TAGS",
      },
      {
        description: "conter um ordenamento inválido",
        value: {
          filter: {
            search: "product",
          },
          format: "full",
          sort: "increasingPRice",
        },
        error: "PRODUCT_QUERY_INVALID_SORT",
      },
    ])("rejeita se $description", ({ value, error }) => {
      const response = new FakeAPIResponse();
      expect(
        payloadValidators.productQuery(response, value as FARequestBody),
      ).toBe(false);
      const responseData = response.getResponse();
      expect(responseData.success).toBe(false);
      if (!responseData.success) expect(responseData.error.id).toBe(error);
    });
  });

  describe("Cadastro de usuário", () => {
    test.each([
      [
        "conter um nome de usuário e senha válidos",
        {
          username: "username",
          password: "1234",
        },
      ],
    ])("aceita se %s", (_, value) => {
      const response = new FakeAPIResponse();
      expect(payloadValidators.authRegister(response, value)).toBe(true);
    });

    test.each([
      {
        description: "for um objeto vazio",
        value: {},
        error: "AUTH_REGISTER_USERNAME_FIELD_NOT_FOUND",
      },
      {
        description: "não conter nome de usuário",
        value: {
          password: "1234",
        },
        error: "AUTH_REGISTER_USERNAME_FIELD_NOT_FOUND",
      },
      {
        description: "não conter senha",
        value: {
          username: "username",
        },
        error: "AUTH_REGISTER_PASSWORD_FIELD_NOT_FOUND",
      },
      {
        description: "conter nome de usuário inválido",
        value: {
          username: "a",
          password: "1234",
        },
        error: "AUTH_REGISTER_INVALID_USERNAME",
      },
      {
        description: "conter senha inválida",
        value: {
          username: "username",
          password: "a234",
        },
        error: "AUTH_REGISTER_INVALID_PASSWORD",
      },
    ])("rejeita se $description", ({ value, error }) => {
      const response = new FakeAPIResponse();
      expect(
        payloadValidators.authRegister(response, value as FARequestBody),
      ).toBe(false);
      const responseData = response.getResponse();
      expect(responseData.success).toBe(false);
      if (!responseData.success) expect(responseData.error.id).toBe(error);
    });
  });

  describe("Login de usuário", () => {
    test.each([
      [
        "conter um nome de usuário e senha válidos",
        {
          username: "username",
          password: "1234",
        },
      ],
    ])("aceita se %s", (_, value) => {
      const response = new FakeAPIResponse();
      expect(payloadValidators.authLogin(response, value)).toBe(true);
    });

    test.each([
      {
        description: "for um objeto vazio",
        value: {},
        error: "AUTH_LOGIN_USERNAME_FIELD_NOT_FOUND",
      },
      {
        description: "não conter nome de usuário",
        value: {
          password: "1234",
        },
        error: "AUTH_LOGIN_USERNAME_FIELD_NOT_FOUND",
      },
      {
        description: "não conter senha",
        value: {
          username: "username",
        },
        error: "AUTH_LOGIN_PASSWORD_FIELD_NOT_FOUND",
      },
      {
        description: "conter nome de usuário inválido",
        value: {
          username: "a",
          password: "1234",
        },
        error: "AUTH_LOGIN_INVALID_USERNAME",
      },
      {
        description: "conter senha inválida",
        value: {
          username: "username",
          password: "a234",
        },
        error: "AUTH_LOGIN_INVALID_PASSWORD",
      },
    ])("rejeita se $description", ({ value, error }) => {
      const response = new FakeAPIResponse();
      expect(
        payloadValidators.authLogin(response, value as FARequestBody),
      ).toBe(false);
      const responseData = response.getResponse();
      expect(responseData.success).toBe(false);
      if (!responseData.success) expect(responseData.error.id).toBe(error);
    });
  });

  describe("Recuperação de senha", () => {
    test.each([
      [
        "conter um nome de usuário e uma nova senha válidos",
        {
          username: "username",
          newPassword: "1234",
        },
      ],
    ])("aceita se %s", (_, value) => {
      const response = new FakeAPIResponse();
      expect(payloadValidators.authRecover(response, value)).toBe(true);
    });

    test.each([
      {
        description: "for um objeto vazio",
        value: {},
        error: "AUTH_RECOVER_USERNAME_FIELD_NOT_FOUND",
      },
      {
        description: "não conter nome de usuário",
        value: {
          newPassword: "1234",
        },
        error: "AUTH_RECOVER_USERNAME_FIELD_NOT_FOUND",
      },
      {
        description: "não conter nova senha",
        value: {
          username: "username",
        },
        error: "AUTH_RECOVER_NEW_PASSWORD_FIELD_NOT_FOUND",
      },
      {
        description: "conter nome de usuário inválido",
        value: {
          username: "a",
          newPassword: "1234",
        },
        error: "AUTH_RECOVER_INVALID_USERNAME",
      },
      {
        description: "conter senha inválida",
        value: {
          username: "username",
          newPassword: "a234",
        },
        error: "AUTH_RECOVER_INVALID_NEW_PASSWORD",
      },
    ])("rejeita se $description", ({ value, error }) => {
      const response = new FakeAPIResponse();
      expect(
        payloadValidators.authRecover(response, value as FARequestBody),
      ).toBe(false);
      const responseData = response.getResponse();
      expect(responseData.success).toBe(false);
      if (!responseData.success) expect(responseData.error.id).toBe(error);
    });
  });

  describe("Atualização de senha", () => {
    test.each([
      [
        "conter uma senha e uma senha nova válidas",
        {
          password: "1234",
          newPassword: "1234",
        },
      ],
    ])("aceita se %s", (_, value) => {
      const response = new FakeAPIResponse();
      expect(payloadValidators.authUpdatePassword(response, value)).toBe(true);
    });

    test.each([
      {
        description: "for um objeto vazio",
        value: {},
        error: "AUTH_UPDATE_PASSWORD_PASSWORD_FIELD_NOT_FOUND",
      },
      {
        description: "não conter senha",
        value: {
          newPassword: "1234",
        },
        error: "AUTH_UPDATE_PASSWORD_PASSWORD_FIELD_NOT_FOUND",
      },
      {
        description: "não conter nova senha",
        value: {
          password: "1234",
        },
        error: "AUTH_UPDATE_PASSWORD_NEW_PASSWORD_FIELD_NOT_FOUND",
      },
      {
        description: "conter uma senha inválida",
        value: {
          password: "a234",
          newPassword: "1234",
        },
        error: "AUTH_UPDATE_PASSWORD_INVALID_PASSWORD",
      },
      {
        description: "conter uma nova senha inválida",
        value: {
          password: "1234",
          newPassword: "a234",
        },
        error: "AUTH_UPDATE_PASSWORD_INVALID_NEW_PASSWORD",
      },
    ])("rejeita se $description", ({ value, error }) => {
      const response = new FakeAPIResponse();
      expect(
        payloadValidators.authUpdatePassword(response, value as FARequestBody),
      ).toBe(false);
      const responseData = response.getResponse();
      expect(responseData.success).toBe(false);
      if (!responseData.success) expect(responseData.error.id).toBe(error);
    });
  });

  describe("Adição de favorito", () => {
    test.each([
      [
        "conter um id de produto válido",
        {
          productId: "PRO-123456789",
        },
      ],
    ])("aceita se %s", (_, value) => {
      const response = new FakeAPIResponse();
      expect(payloadValidators.favoriteAdd(response, value)).toBe(true);
    });

    test.each([
      {
        description: "for um objeto vazio",
        value: {},
        error: "FAVORITE_ADD_PRODUCT_ID_FIELD_NOT_FOUND",
      },
      {
        description: "conter um id de produto inválido",
        value: {
          productId: "PRO-123456789A",
        },
        error: "FAVORITE_ADD_INVALID_PRODUCT_ID",
      },
    ])("rejeita se $description", ({ value, error }) => {
      const response = new FakeAPIResponse();
      expect(
        payloadValidators.favoriteAdd(response, value as FARequestBody),
      ).toBe(false);
      const responseData = response.getResponse();
      expect(responseData.success).toBe(false);
      if (!responseData.success) expect(responseData.error.id).toBe(error);
    });
  });

  describe("Remoção de favorito", () => {
    test.each([
      [
        "conter um id de produto válido",
        {
          productId: "PRO-123456789",
        },
      ],
    ])("aceita se %s", (_, value) => {
      const response = new FakeAPIResponse();
      expect(payloadValidators.favoriteRemove(response, value)).toBe(true);
    });

    test.each([
      {
        description: "for um objeto vazio",
        value: {},
        error: "FAVORITE_REMOVE_PRODUCT_ID_FIELD_NOT_FOUND",
      },
      {
        description: "conter um id de produto inválido",
        value: {
          productId: "PRO-123456789A",
        },
        error: "FAVORITE_REMOVE_INVALID_PRODUCT_ID",
      },
    ])("rejeita se $description", ({ value, error }) => {
      const response = new FakeAPIResponse();
      expect(
        payloadValidators.favoriteRemove(response, value as FARequestBody),
      ).toBe(false);
      const responseData = response.getResponse();
      expect(responseData.success).toBe(false);
      if (!responseData.success) expect(responseData.error.id).toBe(error);
    });
  });

  describe("Consulta de favoritos", () => {
    test.each([
      [
        "conter um formato de favorito válido",
        {
          format: "onlyIds",
        },
      ],
    ])("aceita se %s", (_, value) => {
      const response = new FakeAPIResponse();
      expect(payloadValidators.favoriteGet(response, value)).toBe(true);
    });

    test.each([
      {
        description: "for um objeto vazio",
        value: {},
        error: "FAVORITE_GET_FORMAT_FIELD_NOT_FOUND",
      },
      {
        description: "conter um formato de favorito inválido",
        value: {
          format: "onlyId",
        },
        error: "FAVORITE_GET_INVALID_FORMAT",
      },
    ])("rejeita se $description", ({ value, error }) => {
      const response = new FakeAPIResponse();
      expect(
        payloadValidators.favoriteGet(response, value as FARequestBody),
      ).toBe(false);
      const responseData = response.getResponse();
      expect(responseData.success).toBe(false);
      if (!responseData.success) expect(responseData.error.id).toBe(error);
    });
  });
});

describe("Consultas", () => {
  const fakeExpiration = (() => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    expirationDate.setHours(0, 0, 0, 0);
    return Math.floor(expirationDate.getTime() / 1000);
  })();

  describe("Produtos", () => {
    const productQuery = new ProductsQuery();
    beforeEach(() => {
      productQuery.clear();
    });

    it("seleciona produto por id", () => {
      const productId = "PRO-010A562D2";
      const product = productQuery.selectById(productId).getUnique("default");
      expect(product?.id).toBe(productId);
    });

    it("verifica se produto existe pelo id", () => {
      const productId = "PRO-010A562D2";

      expect(productQuery.existsById("PRO-000000000")).toBe(false);
      expect(productQuery.existsById(productId)).toBe(true);
    });

    it("seleciona produtos por lista de ids", () => {
      const productIdList = [
        "PRO-010A562D2",
        "PRO-B290D11D5",
        "PRO-A3B151AB2",
      ].sort();
      const products = productQuery
        .selectByIdList(productIdList)
        .get("default");
      expect(products.map((p) => p.id).sort()).toEqual(productIdList);
    });

    it("seleciona produtos por lista de ids ignorando inexistentes", () => {
      const productIdList = [
        "PRO-010A562D2",
        "PRO-B290D11D5",
        "PRO-A3B151AB2",
        "PRO-000000000",
      ];
      const products = productQuery
        .selectByIdList(productIdList)
        .get("default");
      expect(products).toHaveLength(3);
    });

    it("seleciona produtos por pesquisa", () => {
      const search = "placa mae asus";
      const expectedIds = [
        "PRO-010A562D2",
        "PRO-B290D11D5",
        "PRO-1D70EA474",
        "PRO-8268BB4FD",
        "PRO-5E19C6A23",
        "PRO-325DAC618",
        "PRO-07262B83C",
        "PRO-5ADE4DBBF",
        "PRO-D85B8DB40",
        "PRO-BDC286153",
        "PRO-7554C4CF6",
        "PRO-248299B87",
        "PRO-CAD5BEDDF",
        "PRO-148CA535D",
        "PRO-7CF7FE5D3",
        "PRO-AFFBDC087",
        "PRO-002A74962",
        "PRO-7A476C4D5",
        "PRO-360C64357",
      ];
      const products = productQuery.selectByName(search).get("default");

      expect(products.map((p) => p.id).sort()).toEqual(expectedIds.sort());
    });

    it("seleciona produtos por id de promoção", () => {
      const saleId = "SAL-15AFC6";
      const expectedIds = [
        "PRO-026333169",
        "PRO-688377899",
        "PRO-002350C9D",
        "PRO-2107D4DB3",
        "PRO-9C0DAC9F7",
        "PRO-E01929272",
        "PRO-2FD400729",
        "PRO-B7FA0718A",
        "PRO-3709D4A9F",
        "PRO-4E0235EDE",
        "PRO-019F41CA9",
        "PRO-AD8E593EB",
      ];
      const products = productQuery.selectBySaleId(saleId).get("default");

      expect(products.map((p) => p.id).sort()).toEqual(expectedIds.sort());
    });

    it("seleciona produtos por categoria", () => {
      const category = "ssd";
      const expectedIds = [
        "PRO-816D1CD88",
        "PRO-FF4ED3B46",
        "PRO-BAF255869",
        "PRO-F7CFE3A61",
        "PRO-B1D7800F9",
        "PRO-D400AD244",
        "PRO-CDF12A42D",
        "PRO-EDA4ADBC5",
        "PRO-361C6F5F2",
        "PRO-EE4536A5F",
        "PRO-0B19040BB",
        "PRO-E137E0887",
        "PRO-6CDB4C194",
        "PRO-95CD1B55D",
        "PRO-08EE20680",
        "PRO-5AA51FA88",
        "PRO-49717C095",
        "PRO-95640912B",
        "PRO-147367BC3",
        "PRO-2E4A7B4E1",
        "PRO-2E145E7AA",
        "PRO-1DFBADD9A",
        "PRO-440F91D6E",
        "PRO-5FFBA85B9",
        "PRO-F734C50BF",
        "PRO-81F2F1B97",
      ];
      const products = productQuery.selectByCategory(category).get("default");
      expect(products.map((p) => p.id).sort()).toEqual(expectedIds.sort());
    });

    it("seleciona produtos por preço mínimo", () => {
      const minPrice = 411293;
      const expectedIds = [
        "PRO-688377899",
        "PRO-2FD400729",
        "PRO-4E0235EDE",
        "PRO-4860CF473",
        "PRO-8B5C16E0F",
        "PRO-68010B73A",
        "PRO-F8E91AFF4",
        "PRO-9764E9629",
        "PRO-89282152C",
        "PRO-ED5A3A0E1",
        "PRO-A8D4D200D",
      ];
      const products = productQuery.selectByMinPrice(minPrice).get("default");
      expect(products.map((p) => p.id).sort()).toEqual(expectedIds.sort());
    });

    it("seleciona produtos por preço máximo", () => {
      const maxPrice = 15693;
      const expectedIds = [
        "PRO-A1778579C",
        "PRO-C1AC2DA5A",
        "PRO-FFD3EBEAB",
        "PRO-733D51022",
        "PRO-B447CB386",
        "PRO-98DAA2CA8",
        "PRO-1534C6DB6",
        "PRO-40B904113",
        "PRO-0B19040BB",
        "PRO-95640912B",
        "PRO-147367BC3",
        "PRO-2E4A7B4E1",
      ];
      const products = productQuery.selectByMaxPrice(maxPrice).get("default");
      expect(products.map((p) => p.id).sort()).toEqual(expectedIds.sort());
    });

    it("seleciona produtos por tags", () => {
      const tags = ["Intel", "Gigabyte"];
      const expectedIds = [
        "PRO-19BD26348",
        "PRO-2F61C7214",
        "PRO-3F55E68AA",
        "PRO-67E2FEC06",
      ];
      const products = productQuery.selectByTags(tags).get("default");
      expect(products.map((p) => p.id).sort()).toEqual(expectedIds.sort());
    });

    it("seleciona produtos com diversos filtros ao mesmo tempo", () => {
      const expectedId = "PRO-688377899";
      const product = productQuery
        .selectBySaleId("SAL-15AFC6")
        .selectByName("Gigabyte")
        .selectByMinPrice(235000)
        .selectByName("5070")
        .selectByTags(["12GB"])
        .getUnique("default");
      expect(product?.id).toBe(expectedId);
    });

    it("ordena em ordem alfabética", () => {
      const expectedIds = [
        "PRO-2E4A7B4E1",
        "PRO-816D1CD88",
        "PRO-BAF255869",
        "PRO-EDA4ADBC5",
        "PRO-F7CFE3A61",
        "PRO-0B19040BB",
        "PRO-440F91D6E",
        "PRO-6CDB4C194",
        "PRO-E137E0887",
        "PRO-361C6F5F2",
        "PRO-95CD1B55D",
        "PRO-08EE20680",
        "PRO-FF4ED3B46",
        "PRO-B1D7800F9",
        "PRO-EE4536A5F",
        "PRO-5AA51FA88",
        "PRO-2E145E7AA",
        "PRO-95640912B",
        "PRO-147367BC3",
        "PRO-CDF12A42D",
        "PRO-D400AD244",
        "PRO-49717C095",
        "PRO-81F2F1B97",
        "PRO-F734C50BF",
        "PRO-5FFBA85B9",
        "PRO-1DFBADD9A",
      ];
      const products = productQuery
        .selectByCategory("ssd")
        .sortByName()
        .get("default");
      expect(products.map((p) => p.id)).toEqual(expectedIds);
    });

    it("ordena em em preço crescente", () => {
      const expectedIds = [
        "PRO-0B19040BB",
        "PRO-147367BC3",
        "PRO-95640912B",
        "PRO-2E4A7B4E1",
        "PRO-2E145E7AA",
        "PRO-5AA51FA88",
        "PRO-D400AD244",
        "PRO-5FFBA85B9",
        "PRO-E137E0887",
        "PRO-49717C095",
        "PRO-1DFBADD9A",
        "PRO-361C6F5F2",
        "PRO-EE4536A5F",
        "PRO-440F91D6E",
        "PRO-6CDB4C194",
        "PRO-95CD1B55D",
        "PRO-B1D7800F9",
        "PRO-CDF12A42D",
        "PRO-81F2F1B97",
        "PRO-F734C50BF",
        "PRO-08EE20680",
        "PRO-BAF255869",
        "PRO-EDA4ADBC5",
        "PRO-F7CFE3A61",
        "PRO-FF4ED3B46",
        "PRO-816D1CD88",
      ];
      const products = productQuery
        .selectByCategory("ssd")
        .sortByIncreasingPrice()
        .get("default");
      expect(products.map((p) => p.id)).toEqual(expectedIds);
    });

    it("ordena em em preço decrescente", () => {
      const expectedIds = [
        "PRO-816D1CD88",
        "PRO-FF4ED3B46",
        "PRO-F7CFE3A61",
        "PRO-EDA4ADBC5",
        "PRO-BAF255869",
        "PRO-08EE20680",
        "PRO-F734C50BF",
        "PRO-81F2F1B97",
        "PRO-CDF12A42D",
        "PRO-B1D7800F9",
        "PRO-95CD1B55D",
        "PRO-6CDB4C194",
        "PRO-440F91D6E",
        "PRO-EE4536A5F",
        "PRO-361C6F5F2",
        "PRO-1DFBADD9A",
        "PRO-49717C095",
        "PRO-E137E0887",
        "PRO-5FFBA85B9",
        "PRO-D400AD244",
        "PRO-2E145E7AA",
        "PRO-5AA51FA88",
        "PRO-2E4A7B4E1",
        "PRO-95640912B",
        "PRO-147367BC3",
        "PRO-0B19040BB",
      ];
      const products = productQuery
        .selectByCategory("ssd")
        .sortByDecreasingPrice()
        .get("default");
      expect(products.map((p) => p.id)).toEqual(expectedIds);
    });

    it("retorna produto no padrão 'default'", () => {
      const expectedProduct = {
        id: "PRO-010A562D2",
        name: "Placa-Mãe ASUS TUF GAMING B760M-PLUS WIFI II, Intel, DDR5",
        category: "moba",
        price: {
          full: 152173,
          pix: 139999,
          pixDiscont: 8,
          maxInstallments: 12,
          installments: 12682,
        },
        media: {
          thumb: "PRO-010A562D2-thumb.jpg",
          images: [
            {
              small: "PRO-010A562D2-00-s.jpg",
              medium: "PRO-010A562D2-00-m.jpg",
            },
            {
              small: "PRO-010A562D2-01-s.jpg",
              medium: "PRO-010A562D2-01-m.jpg",
            },
            {
              small: "PRO-010A562D2-02-s.jpg",
              medium: "PRO-010A562D2-02-m.jpg",
            },
            {
              small: "PRO-010A562D2-03-s.jpg",
              medium: "PRO-010A562D2-03-m.jpg",
            },
            {
              small: "PRO-010A562D2-04-s.jpg",
              medium: "PRO-010A562D2-04-m.jpg",
            },
          ],
        },
        tags: ["Asus", "Intel", "DDR5"],
        description:
          "A Placa-Mãe ASUS TUF GAMING B760M-PLUS WIFI II, Intel, DDR5 é uma placa-mãe voltada para montar ou atualizar computadores com plataforma Intel, memória DDR5. Também oferece Wi-Fi para facilitar a conexão à rede. É uma boa escolha para montar ou atualizar um PC com compatibilidade clara e componentes bem definidos.",
        specs: [
          ["Marca", "ASUS"],
          ["Plataforma", "Intel"],
          ["Memória", "DDR5"],
          ["Conectividade", "Wi-Fi"],
        ],
        searchName: "placa mae asus tuf gaming b760m plus wifi ii intel ddr5",
      };
      const product = productQuery
        .selectById(expectedProduct.id)
        .getUnique("default");

      expect(product).toEqual(expectedProduct);
    });

    it("retorna produto no padrão 'card'", () => {
      const expectedProduct = {
        id: "PRO-010A562D2",
        name: "Placa-Mãe ASUS TUF GAMING B760M-PLUS WIFI II, Intel, DDR5",
        price: {
          full: 152173,
          pix: 139999,
          pixDiscont: 8,
          maxInstallments: 12,
          installments: 12682,
        },
        media: {
          thumb: "PRO-010A562D2-thumb.jpg",
        },
      };
      const product = productQuery
        .selectById(expectedProduct.id)
        .getUnique("card");

      expect(product).toEqual(expectedProduct);
    });

    it("retorna produto no padrão 'suggestion'", () => {
      const expectedProduct = {
        id: "PRO-010A562D2",
        name: "Placa-Mãe ASUS TUF GAMING B760M-PLUS WIFI II, Intel, DDR5",
        searchName: "placa mae asus tuf gaming b760m plus wifi ii intel ddr5",
      };
      const product = productQuery
        .selectById(expectedProduct.id)
        .getUnique("suggestion");

      expect(product).toEqual(expectedProduct);
    });

    it("retorna produto no padrão 'relatedNeeds'", () => {
      const productId = "PRO-010A562D2";
      const expected = {
        category: "moba",
        pixPrice: 139999,
      };
      const product = productQuery
        .selectById(productId)
        .getUnique("relatedNeeds");

      expect(product).toEqual(expected);
    });

    it("retorna produto em promoção com as alterações corretas", () => {
      const expectedProduct = {
        id: "PRO-026333169",
        sale: {
          id: "SAL-15AFC6",
          name: "Festival das Placas de Vídeo",
          expiration: fakeExpiration,
          discont: 10,
        },
        price: {
          full: 139990,
          pix: 131591,
          pixDiscont: 6,
          maxInstallments: 12,
          installments: 11666,
          previous: 155544,
        },
      };
      const product = productQuery
        .selectById(expectedProduct.id)
        .getUnique("default");

      expect(product?.sale).toEqual(expectedProduct.sale);
      expect(product?.price).toEqual(expectedProduct.price);
    });
  });

  describe("Promoções", () => {
    const salesQuery = new SalesQuery();
    beforeEach(() => {
      salesQuery.clear();
    });

    it("seleciona promoção por id", () => {
      const saleId = "SAL-15AFC6";
      const sale = salesQuery.selectById(saleId).getUnique("default");
      expect(sale?.id).toBe(saleId);
    });

    it("retorna promoção no padrão 'default'", () => {
      const expectedSale = {
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
      };
      const sale = salesQuery.selectById(expectedSale.id).getUnique("default");
      expect(sale).toEqual(expectedSale);
    });

    it("retorna promoção no padrão 'resolvedProducts'", () => {
      const saleId = "SAL-15AFC6";
      const expectedFristResolvedProduct = {
        id: "PRO-026333169",
        name: "Placa de Vídeo Gigabyte RTX 3050 Windforce OC NVIDIA GeForce, 6GB, GDDR6, DLSS, Ray Tracing",
        sale: {
          id: "SAL-15AFC6",
          name: "Festival das Placas de Vídeo",
          expiration: fakeExpiration,
          discont: 10,
        },
        price: {
          full: 139990,
          pix: 131591,
          pixDiscont: 6,
          maxInstallments: 12,
          installments: 11666,
          previous: 155544,
        },
        media: {
          thumb: "PRO-026333169-thumb.jpg",
        },
      };
      const sale = salesQuery.selectById(saleId).getUnique("resolvedProducts");

      expect(sale?.products[0]).toEqual(expectedFristResolvedProduct);
    });
  });

  describe("Banners", () => {
    const bannerQuery = new BannersQuery();
    beforeEach(() => {
      bannerQuery.clear();
    });

    it("seleciona banner por id", () => {
      const bannerId = "BAN-1AF1AC";
      const banner = bannerQuery.selectById(bannerId).getUnique();
      expect(banner?.id).toBe(bannerId);
    });

    it("retorna banner no formato 'default'", () => {
      const expectedProduct = {
        id: "BAN-1AF1AC",
        link: "/catalog?sale=SAL-15AFC6&saleName=Festival%20das%20Placas%20de%20Vídeo",
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
      };
      const bannerId = "BAN-1AF1AC";
      const banner = bannerQuery.selectById(bannerId).getUnique();
      expect(banner).toEqual(expectedProduct);
    });
  });

  describe("Coleções", () => {
    const collectionsQuery = new CollectionsQuery();
    beforeEach(() => {
      collectionsQuery.clear();
    });

    it("retorna coleção por id", () => {
      const collectionId = "COL-16C9A2";
      const collection = collectionsQuery.selectById(collectionId).getUnique();
      expect(collection?.id).toBe(collectionId);
    });

    it("retorna coleção no formato 'default'", () => {
      const collectionId = "COL-16C9A2";
      const collectionName = "Novidades";
      const expectedFristResolvedProduct = {
        id: "PRO-D55645F74",
        name: "Placa de Vídeo XFX AMD RADEON RX 7600 Gaming Graphics Card, 8GB, GDDR6",
        price: {
          full: 210576,
          pix: 197941,
          pixDiscont: 6,
          maxInstallments: 12,
          installments: 17548,
        },
        media: {
          thumb: "PRO-D55645F74-thumb.jpg",
        },
      };
      const collection = collectionsQuery.selectById(collectionId).getUnique();
      expect(collection?.id).toBe(collectionId);
      expect(collection?.name).toBe(collectionName);
      expect(collection?.products[0]).toEqual(expectedFristResolvedProduct);
    });
  });

  describe("Sessões", () => {
    const LOCAL_STORAGE_KEY = "fakeAPI-sessions";
    beforeEach(() => {
      localStorage.clear();
    });
    const getSessionsFromLS = () => {
      const sessions = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "null",
      );
      if (!sessions) {
        return null;
      }
      return sessions.data;
    };

    it("cria e insere sessão", () => {
      const sessionsQuery = new SessionsQuery();
      const sessionId = "SES-0123456789";
      const userId = "USR-012345678";
      const newSession = sessionsQuery.createAndInsert(sessionId, userId);
      expect(getSessionsFromLS()).toEqual([
        {
          id: sessionId,
          userId,
          startedAt: newSession?.startedAt,
        },
      ]);
    });

    it("não insere sessão duplicada", () => {
      const sessionsQuery = new SessionsQuery();
      const sessionId = "SES-0123456789";
      const userId = "USR-012345678";
      const newSession = sessionsQuery.createAndInsert(sessionId, userId);
      const duplicateSession = sessionsQuery.createAndInsert(sessionId, userId);

      expect(duplicateSession).toBeNull();
      expect(getSessionsFromLS()).toEqual([
        {
          id: sessionId,
          userId,
          startedAt: newSession?.startedAt,
        },
      ]);
    });

    it("remove sessão", () => {
      const sessionsQuery = new SessionsQuery();
      const sessionId = "SES-0123456789";
      const userId = "USR-012345678";
      sessionsQuery.createAndInsert(sessionId, userId);
      sessionsQuery.deleteById(sessionId);
      expect(getSessionsFromLS()).toEqual([]);
    });

    it("verifica se sessão existe", () => {
      const sessionsQuery = new SessionsQuery();
      const sessionId = "SES-0123456789";
      const userId = "USR-012345678";
      sessionsQuery.createAndInsert(sessionId, userId);
      expect(sessionsQuery.existsById("SES-000000000")).toBe(false);
      expect(sessionsQuery.existsById(sessionId)).toBe(true);
    });

    it("seleciona sessão por id", () => {
      const sessionsQuery = new SessionsQuery();
      const sessionId = "SES-0123456789";
      const userId = "USR-012345678";
      sessionsQuery.createAndInsert(sessionId, userId);

      const session = sessionsQuery.selectById(sessionId).getUnique();
      expect(session?.id).toBe(sessionId);
    });

    it("retorna sessão no padrão 'default'", () => {
      const sessionsQuery = new SessionsQuery();
      const sessionId = "SES-0123456789";
      const userId = "USR-012345678";
      const newSession = sessionsQuery.createAndInsert(sessionId, userId);

      const session = sessionsQuery.selectById(sessionId).getUnique();
      expect([session]).toEqual([
        {
          id: sessionId,
          userId,
          startedAt: newSession?.startedAt,
        },
      ]);
    });
  });

  describe("Favoritos", () => {
    const LOCAL_STORAGE_KEY = "fakeAPI-favorites";
    beforeEach(() => {
      localStorage.clear();
    });
    const getFavoritesFromLS = () => {
      const favorites = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "null",
      );
      if (!favorites) {
        return null;
      }
      return favorites.data;
    };

    it("cria e insere favorito", () => {
      const favoritesQuery = new FavoritesQuery();
      const userId = "USR-0123456789";
      const productId = "PRO-010A562D2";
      const favorite = favoritesQuery.createAndInsert(userId, productId);

      expect(favorite).toEqual({
        userId,
        productId,
      });
      expect(getFavoritesFromLS()).toEqual([
        {
          userId,
          productId,
        },
      ]);
    });

    it("não insere favorito duplicado", () => {
      const favoritesQuery = new FavoritesQuery();
      const userId = "USR-0123456789";
      const productId = "PRO-010A562D2";
      favoritesQuery.createAndInsert(userId, productId);
      const duplicateFavorite = favoritesQuery.createAndInsert(
        userId,
        productId,
      );

      expect(duplicateFavorite).toBeNull();
      expect(getFavoritesFromLS()).toEqual([
        {
          userId,
          productId,
        },
      ]);
    });

    it("remove favorito", () => {
      const favoritesQuery = new FavoritesQuery();
      const userId = "USR-0123456789";
      const productId = "PRO-010A562D2";
      favoritesQuery.createAndInsert(userId, productId);
      favoritesQuery.delete(userId, productId);

      expect(getFavoritesFromLS()).toEqual([]);
    });

    it("verifica se favorito existe", () => {
      const favoritesQuery = new FavoritesQuery();
      const userId = "USR-0123456789";
      const productId = "PRO-010A562D2";
      favoritesQuery.createAndInsert(userId, productId);

      expect(favoritesQuery.exists(userId, "PRO-000000000")).toBe(false);
      expect(favoritesQuery.exists(userId, productId)).toBe(true);
    });

    it("seleciona favoritos por id de usuário", () => {
      const favoritesQuery = new FavoritesQuery();
      const userId = "USR-0123456789";
      const otherUserId = "USR-9876543210";
      favoritesQuery.createAndInsert(userId, "PRO-010A562D2");
      favoritesQuery.createAndInsert(userId, "PRO-B290D11D5");
      favoritesQuery.createAndInsert(otherUserId, "PRO-A3B151AB2");

      const favorites = favoritesQuery.selectByUserId(userId).get("default");

      expect(favorites).toEqual([
        {
          userId,
          productId: "PRO-010A562D2",
        },
        {
          userId,
          productId: "PRO-B290D11D5",
        },
      ]);
    });

    it("retorna favorito no padrão 'default'", () => {
      const favoritesQuery = new FavoritesQuery();
      const userId = "USR-0123456789";
      const productId = "PRO-010A562D2";
      favoritesQuery.createAndInsert(userId, productId);

      const favorite = favoritesQuery
        .selectByUserId(userId)
        .getUnique("default");

      expect(favorite).toEqual({
        userId,
        productId,
      });
    });

    it("retorna favorito no padrão 'productId'", () => {
      const favoritesQuery = new FavoritesQuery();
      const userId = "USR-0123456789";
      const productId = "PRO-010A562D2";
      favoritesQuery.createAndInsert(userId, productId);

      const favoriteProductId = favoritesQuery
        .selectByUserId(userId)
        .getUnique("productId");

      expect(favoriteProductId).toBe(productId);
    });

    it("retorna favorito no padrão 'resolvedProduct'", () => {
      const favoritesQuery = new FavoritesQuery();
      const userId = "USR-0123456789";
      const productId = "PRO-010A562D2";
      const expectedProduct = {
        id: "PRO-010A562D2",
        name: "Placa-Mãe ASUS TUF GAMING B760M-PLUS WIFI II, Intel, DDR5",
        price: {
          full: 152173,
          pix: 139999,
          pixDiscont: 8,
          maxInstallments: 12,
          installments: 12682,
        },
        media: {
          thumb: "PRO-010A562D2-thumb.jpg",
        },
      };
      favoritesQuery.createAndInsert(userId, productId);

      const favoriteProduct = favoritesQuery
        .selectByUserId(userId)
        .getUnique("resolvedProduct");

      expect(favoriteProduct).toEqual(expectedProduct);
    });
  });

  describe("Usuários", () => {
    const LOCAL_STORAGE_KEY = "fakeAPI-users";
    beforeEach(() => {
      localStorage.clear();
    });
    const getUsersFromLS = () => {
      const users = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "null",
      );
      if (!users) {
        return null;
      }
      return users.data;
    };

    it("cria e insere usuário", () => {
      const userQuery = new UsersQuery();

      const user = {
        id: "USR-0123456789",
        username: "username",
        password: "1234",
      };
      const createdUser = userQuery.createAndInsert(
        user.id,
        user.username,
        user.password,
      );
      expect(createdUser).toBeDefined();
      expect(getUsersFromLS()).toEqual([user]);
    });

    it("não insere usuário duplicado", () => {
      const userQuery = new UsersQuery();

      const user = {
        id: "USR-0123456789",
        username: "username",
        password: "1234",
      };
      userQuery.createAndInsert(user.id, user.username, user.password);
      const duplicateUser = userQuery.createAndInsert(
        user.id,
        user.username,
        user.password,
      );

      expect(duplicateUser).toBeNull();
      expect(getUsersFromLS()).toEqual([user]);
    });

    it("verifica se usuário existe pelo id", () => {
      const userQuery = new UsersQuery();

      const user = {
        id: "USR-0123456789",
        username: "username",
        password: "1234",
      };
      userQuery.createAndInsert(user.id, user.username, user.password);

      expect(userQuery.existsById("USR-000000000")).toBe(false);
      expect(userQuery.existsById(user.id)).toBe(true);
    });

    it("verifica se usuário existe pelo nome de usuário", () => {
      const userQuery = new UsersQuery();

      const user = {
        id: "USR-0123456789",
        username: "username",
        password: "1234",
      };
      userQuery.createAndInsert(user.id, user.username, user.password);

      expect(userQuery.existsByUsername("noname")).toBe(false);
      expect(userQuery.existsByUsername(user.username)).toBe(true);
    });

    it("atualiza a senha", () => {
      const userQuery = new UsersQuery();

      const user = {
        id: "USR-0123456789",
        username: "username",
        password: "1234",
      };
      userQuery.createAndInsert(user.id, user.username, user.password);
      userQuery.updatePassword(user.id, "4321");

      expect(getUsersFromLS()).toEqual([
        {
          id: user.id,
          username: user.username,
          password: "4321",
        },
      ]);
    });

    it("seleciona pelo id", () => {
      const userQuery = new UsersQuery();

      const user = {
        id: "USR-0123456789",
        username: "username",
        password: "1234",
      };
      userQuery.createAndInsert(user.id, user.username, user.password);
      const selectedUser = userQuery.selectById(user.id).getUnique("default");

      expect(selectedUser?.id).toBe(user.id);
    });

    it("seleciona pelo nome de usuário", () => {
      const userQuery = new UsersQuery();

      const user = {
        id: "USR-0123456789",
        username: "username",
        password: "1234",
      };
      userQuery.createAndInsert(user.id, user.username, user.password);
      const selectedUser = userQuery
        .selectByUsername(user.username)
        .getUnique("default");

      expect(selectedUser?.id).toBe(user.id);
    });

    it("retorna usuário no padrão 'default'", () => {
      const userQuery = new UsersQuery();

      const user = {
        id: "USR-0123456789",
        username: "username",
        password: "1234",
      };
      userQuery.createAndInsert(user.id, user.username, user.password);
      const selectedUser = userQuery
        .selectById("USR-0123456789")
        .getUnique("default");

      expect(selectedUser).toEqual(user);
    });

    it("retorna usuário no padrão 'private'", () => {
      const userQuery = new UsersQuery();

      const user = {
        id: "USR-0123456789",
        username: "username",
        password: "1234",
      };
      userQuery.createAndInsert(user.id, user.username, user.password);
      const selectedUser = userQuery
        .selectById("USR-0123456789")
        .getUnique("private");

      expect(selectedUser).toEqual({
        id: user.id,
        username: user.username,
      });
    });
  });
});

describe("Serviços", () => {
  describe("Homepage", () => {
    it("retorna os banners", () => {
      const homepageService = new HomepageService();
      const response = new FakeAPIResponse<HomepageBanners>();
      homepageService.getBanners(response);
      const responseResult = response.getResponse();
      expect(responseResult.success).toBe(true);
      if (!responseResult.success) return;
      expect(responseResult.data).toBeDefined();
    });

    it("retorna a promoção", () => {
      const homepageService = new HomepageService();
      const response = new FakeAPIResponse<Sale["resolvedProducts"]>();
      homepageService.getSale(response);
      const responseResult = response.getResponse();
      expect(responseResult.success).toBe(true);
      if (!responseResult.success) return;
      expect(responseResult.data).toBeDefined();
    });

    it("retorna as coleções", () => {
      const homepageService = new HomepageService();
      const response = new FakeAPIResponse<HomepageCollections>();
      homepageService.getCollections(response);
      const responseResult = response.getResponse();
      expect(responseResult.success).toBe(true);
      if (!responseResult.success) return;
      expect(responseResult.data).toBeDefined();
    });

    it("retorna erro se o id do banner de promoção é inexistente", async () => {
      vi.resetModules();
      vi.doMock("../config", () => ({
        config: {
          homepage: {
            saleBannerId: "BAN-000000",
            adBannerId: "BAN-54C86E",
          },
        },
      }));
      const { HomepageService } = await import("../services/HomepageService");
      const homepageService = new HomepageService();
      const response = new FakeAPIResponse<HomepageBanners>();
      homepageService.getBanners(response);
      const responseResult = response.getResponse();
      expect(responseResult.success).toBe(false);
      if (responseResult.success) return;
      expect(responseResult.error.id).toBe("HP_SALE_BANNER_NOT_FOUND");
    });

    it("retorna erro se o id do banner de propaganda é inexistente", async () => {
      vi.resetModules();
      vi.doMock("../config", () => ({
        config: {
          homepage: {
            saleBannerId: "BAN-1AF1AC",
            adBannerId: "BAN-000000",
          },
        },
      }));
      const { HomepageService } = await import("../services/HomepageService");
      const homepageService = new HomepageService();
      const response = new FakeAPIResponse<HomepageBanners>();
      homepageService.getBanners(response);
      const responseResult = response.getResponse();
      expect(responseResult.success).toBe(false);
      if (responseResult.success) return;
      expect(responseResult.error.id).toBe("HP_AD_BANNER_NOT_FOUND");
    });

    it("retorna erro se o id da promoção é inexistente", async () => {
      vi.resetModules();
      vi.doMock("../config", () => ({
        config: {
          homepage: {
            saleId: "SAL-000000",
          },
        },
      }));
      const { HomepageService } = await import("../services/HomepageService");
      const homepageService = new HomepageService();
      const response = new FakeAPIResponse<Sale["resolvedProducts"]>();
      homepageService.getSale(response);
      const responseResult = response.getResponse();
      expect(responseResult.success).toBe(false);
      if (responseResult.success) return;
      expect(responseResult.error.id).toBe("HP_SALE_NOT_FOUND");
    });

    it("retorna erro se o id da primeira coleção é inexistente", async () => {
      vi.resetModules();
      vi.doMock("../config", () => ({
        config: {
          homepage: {
            firstCollectionId: "COL-16C9A2",
            secondCollectionId: "COL-000000",
          },
        },
      }));
      const { HomepageService } = await import("../services/HomepageService");
      const homepageService = new HomepageService();
      const response = new FakeAPIResponse<HomepageCollections>();
      homepageService.getCollections(response);
      const responseResult = response.getResponse();
      expect(responseResult.success).toBe(false);
      if (responseResult.success) return;
      expect(responseResult.error.id).toBe("HP_SECOND_COLLECTION_NOT_FOUND");
    });

    it("retorna erro se o id da segunda coleção é inexistente", async () => {
      vi.resetModules();
      vi.doMock("../config", () => ({
        config: {
          homepage: {
            firstCollectionId: "COL-000000",
            secondCollectionId: "COL-B6876C",
          },
        },
      }));
      const { HomepageService } = await import("../services/HomepageService");
      const homepageService = new HomepageService();
      const response = new FakeAPIResponse<HomepageCollections>();
      homepageService.getCollections(response);
      const responseResult = response.getResponse();
      expect(responseResult.success).toBe(false);
      if (responseResult.success) return;
      expect(responseResult.error.id).toBe("HP_FIRST_COLLECTION_NOT_FOUND");
    });
  });
});
