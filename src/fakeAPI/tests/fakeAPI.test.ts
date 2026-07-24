import { describe, expect, test } from "vitest";

import { isRequestBody } from "@fakeAPI/isRequestBody";
import { primitiveValidators } from "@fakeAPI/primitiveValidators";
import { payloadValidators } from "@fakeAPI/payloadValidators";
import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";

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
