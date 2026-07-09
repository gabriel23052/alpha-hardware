import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";

import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { ErrorMessages } from "@fakeAPI/ErrorMessages";

import { productsFixtures } from "./fixtures/products";
import { salesFixtures } from "./fixtures/sales";
import { collectionsFixtures } from "./fixtures/collections";
import { bannersFixtures } from "./fixtures/banners";
import { usersFixtures } from "./fixtures/users";

import { ProductsTable } from "@fakeAPI/tables/ProductsTable";
import { SalesTable } from "@fakeAPI/tables/SalesTable";
import { CollectionsTable } from "@fakeAPI/tables/CollectionsTable";
import { BannersTable } from "@fakeAPI/tables/BannersTable";
import { UsersTable } from "@fakeAPI/tables/UsersTable";

import { PrimitiveValidations } from "@fakeAPI/PrimitiveValidations";
import { Validations } from "@fakeAPI/Validations";
import { config } from "@fakeAPI/config";
import { SessionsTable } from "@fakeAPI/tables/SessionsTable";
import { sessionsFixture } from "./fixtures/sessions";

function createLocalStorageMock() {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
}

describe("tables", () => {
  describe("BannersTable", () => {
    const bannersTable = new BannersTable();

    it("Retorna banner para id existente", () => {
      const fixture = bannersFixtures.banner;
      bannersTable.searchById(fixture.id);
      expect(bannersTable.get()[0]).toEqual(fixture.expected);
    });

    it("Retorna array vazio para id inexistente", () => {
      bannersTable.searchById("BAN-000000");
      expect(bannersTable.get()).toEqual([]);
    });

    it("Retorna banner em formato 'full'", () => {
      const fixture = bannersFixtures.banner;
      bannersTable.searchById(fixture.id);
      expect(bannersTable.getInFullFormat()[0]).toEqual(fixture.expected);
    });
  });

  describe("ProductsTable", () => {
    const productsTable = new ProductsTable();

    it("Retorna produto para id existente", () => {
      const fixture = productsFixtures.searchAndReturn.product;
      productsTable.searchById(fixture.id);
      expect(productsTable.get()).toEqual(fixture.expected);
    });

    it("Retorna array vazia para id inexistente", () => {
      productsTable.searchById("PRO-000000000");
      expect(productsTable.get()).toEqual([]);
    });

    it("Retorna array completo para ids existentes", () => {
      const fixture = productsFixtures.searchAndReturn.productList;
      productsTable.searchByIdList(fixture.ids);
      expect(productsTable.get()).toEqual(fixture.expected);
    });

    it("Retorna array parcial para lista com alguns ids inexistentes", () => {
      const fixture = productsFixtures.searchAndReturn.productList;
      productsTable.searchByIdList(["PRO-000000000", ...fixture.ids]);
      expect(productsTable.get()).toEqual(fixture.expected);
    });

    it("Retorna array vazio para lista com todos ids inexistentes", () => {
      productsTable.searchByIdList([
        "PRO-000000000",
        "PRO-000000001",
        "PRO-000000002",
      ]);
      expect(productsTable.get()).toEqual([]);
    });

    it("Retorna produto em formato 'full'", () => {
      const fixture = productsFixtures.searchAndReturn.productInFullFormat;
      productsTable.searchById(fixture.id);
      expect(productsTable.getInFullFormat()).toEqual(fixture.expected);
    });

    it("Retorna produto em formato 'card'", () => {
      const fixture = productsFixtures.searchAndReturn.productInCardFormat;
      productsTable.searchById(fixture.id);
      expect(productsTable.getInCardFormat()).toEqual(fixture.expected);
    });

    it("Retorna produto em formato 'price'", () => {
      const fixture = productsFixtures.searchAndReturn.productInPriceFormat;
      productsTable.searchById(fixture.id);
      expect(productsTable.getInPriceFormat()).toEqual(fixture.expected);
    });

    it("Retorna produto em formato 'suggestion'", () => {
      const fixture =
        productsFixtures.searchAndReturn.productInSuggestionFormat;
      productsTable.searchById(fixture.id);
      expect(productsTable.getInSuggestionFormat()).toEqual(fixture.expected);
    });

    it("Retorna produto em promoção com ela aplicada", () => {
      const fixture = productsFixtures.searchAndReturn.saleProduct;
      productsTable.searchById(fixture.id);
      expect(productsTable.getInFullFormat()).toEqual(fixture.expected);
    });

    it("Retorna produtos em promoção com elas aplicadas", () => {
      const fixture = productsFixtures.searchAndReturn.saleProductsList;
      productsTable.searchByIdList(fixture.ids);
      expect(productsTable.getInFullFormat()).toEqual(fixture.expected);
    });

    it("Ordena produtos em ordem alfabética", () => {
      const fixture = productsFixtures.sorts.sortAlphabetical;
      productsTable.searchByIdList(fixture.ids);
      productsTable.sort("alphabetical");
      const returnedIds = productsTable.getInFullFormat().map(({ id }) => id);
      expect(returnedIds).toEqual(fixture.expected);
    });

    it("Ordena produtos em preço crescente", () => {
      const fixture = productsFixtures.sorts.sortByIncreasingPrice;
      productsTable.searchByIdList(fixture.ids);
      productsTable.sort("increasingPrice");
      const returnedIds = productsTable.getInFullFormat().map(({ id }) => id);
      expect(returnedIds).toEqual(fixture.expected);
    });

    it("Ordena produtos em preço decrescente", () => {
      const fixture = productsFixtures.sorts.sortByDecreasingPrice;
      productsTable.searchByIdList(fixture.ids);
      productsTable.sort("decreasingPrice");
      const returnedIds = productsTable.getInFullFormat().map(({ id }) => id);
      expect(returnedIds).toEqual(fixture.expected);
    });

    it("Ordena produtos com promoção em preço crescente", () => {
      const fixture = productsFixtures.sorts.sortByIPWithSaleProducts;
      productsTable.searchByIdList(fixture.ids);
      productsTable.sort("increasingPrice");
      const returnedIds = productsTable.getInFullFormat().map(({ id }) => id);
      expect(returnedIds).toEqual(fixture.expected);
    });

    it("Ordena produtos com promoção em preço decrescente", () => {
      const fixture = productsFixtures.sorts.sortByDPWithSaleProducts;
      productsTable.searchByIdList(fixture.ids);
      productsTable.sort("decreasingPrice");
      const returnedIds = productsTable.getInFullFormat().map(({ id }) => id);
      expect(returnedIds).toEqual(fixture.expected);
    });

    it("Ordena produtos com preços repetidos em preço crescente", () => {
      const fixture = productsFixtures.sorts.sortByIPWithRepeatedPrices;
      productsTable.searchByIdList(fixture.ids);
      productsTable.sort("increasingPrice");
      const returnedIds = productsTable.getInFullFormat().map(({ id }) => id);
      expect(returnedIds).toEqual(fixture.expected);
    });

    it("Ordena produtos com preços repetidos em preço decrescente", () => {
      const fixture = productsFixtures.sorts.sortByDPWithRepeatedPrices;
      productsTable.searchByIdList(fixture.ids);
      productsTable.sort("decreasingPrice");
      const returnedIds = productsTable.getInFullFormat().map(({ id }) => id);
      expect(returnedIds).toEqual(fixture.expected);
    });

    it("Filtra produtos por nome", () => {
      const fixture = productsFixtures.filters.name;
      for (const { filter, expectedIds } of fixture) {
        productsTable.searchByFilter(filter);
        const returnedIds = productsTable
          .getInFullFormat()
          .map(({ id }) => id)
          .sort();
        expect(returnedIds).toEqual(expectedIds.sort());
      }
    });

    it("Filtra produtos por promoção", () => {
      const fixture = productsFixtures.filters.saleId;
      for (const { filter, expectedIds } of fixture) {
        productsTable.searchByFilter(filter);
        const returnedIds = productsTable
          .getInFullFormat()
          .map(({ id }) => id)
          .sort();
        expect(returnedIds).toEqual(expectedIds.sort());
      }
    });

    it("Filtra produtos por categoria", () => {
      const fixture = productsFixtures.filters.category;
      for (const { filter, expectedIds } of fixture) {
        productsTable.searchByFilter(filter);
        const returnedIds = productsTable
          .getInFullFormat()
          .map(({ id }) => id)
          .sort();
        expect(returnedIds).toEqual(expectedIds.sort());
      }
    });

    it("Filtra produtos por preço mínimo", () => {
      const fixture = productsFixtures.filters.minPrice;
      for (const { filter, expectedIds } of fixture) {
        productsTable.searchByFilter(filter);
        const returnedIds = productsTable
          .getInFullFormat()
          .map(({ id }) => id)
          .sort();
        expect(returnedIds).toEqual(expectedIds.sort());
      }
    });

    it("Filtra produtos por preço máximo", () => {
      const fixture = productsFixtures.filters.maxPrice;
      for (const { filter, expectedIds } of fixture) {
        productsTable.searchByFilter(filter);
        const returnedIds = productsTable
          .getInFullFormat()
          .map(({ id }) => id)
          .sort();
        expect(returnedIds).toEqual(expectedIds.sort());
      }
    });

    it("Filtra produtos por tags", () => {
      const fixture = productsFixtures.filters.tags;
      for (const { filter, expectedIds } of fixture) {
        productsTable.searchByFilter(filter);
        const returnedIds = productsTable
          .getInFullFormat()
          .map(({ id }) => id)
          .sort();
        expect(returnedIds).toEqual(expectedIds.sort());
      }
    });

    it("Filtra produtos por múltiplos filtros", () => {
      const fixture = productsFixtures.filters.multiples;
      for (const { filter, expectedIds } of fixture) {
        productsTable.searchByFilter(filter);
        const returnedIds = productsTable
          .getInFullFormat()
          .map(({ id }) => id)
          .sort();
        expect(returnedIds).toEqual(expectedIds.sort());
      }
    });
  });

  describe("CollectionsTable", () => {
    const collectionsTable = new CollectionsTable();

    it("Retorna coleção para id existente", () => {
      const { id, expected } = collectionsFixtures.collection;
      collectionsTable.searchById(id);
      expect(collectionsTable.get()[0]).toEqual(expected);
    });

    it("Retorna array vazio para id inexistente", () => {
      collectionsTable.searchById("COL-000000");
      expect(collectionsTable.get()).toEqual([]);
    });

    it("Retorna coleção em formato 'card'", () => {
      const { id, expected } = collectionsFixtures.collectionInCardFormat;
      collectionsTable.searchById(id);
      expect(collectionsTable.getInPrCardFormat()).toEqual(expected);
    });
  });

  describe("SalesTable", () => {
    const salesTable = new SalesTable();

    it("Retorna promoção para id existente", () => {
      const { id, expected } = salesFixtures.sale;
      salesTable.searchById(id);
      expect(salesTable.get()[0]).toEqual(expected);
    });

    it("Retorna array vazio para id inexistente", () => {
      salesTable.searchById("SAL-000000");
      expect(salesTable.get()).toEqual([]);
    });

    it("Retorna promoção em formato 'card'", () => {
      const { id, expected } = salesFixtures.saleInCardFormat;
      salesTable.searchById(id);
      expect(salesTable.getInPrCardFormat()[0]).toEqual(expected);
    });
  });

  describe("UsersTable", () => {
    const localStorageKey = config.localStorageKeys.users;

    beforeEach(() => {
      vi.stubGlobal("localStorage", createLocalStorageMock());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("Inicializa localStorage vazio quando não existem usuários", () => {
      new UsersTable();
      expect(localStorage.getItem(localStorageKey)).toBe("[]");
    });

    it("Retorna usuário para id existente", () => {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(usersFixtures.userList),
      );
      const usersTable = new UsersTable();
      const expected = [usersFixtures.userList[0]];

      usersTable.searchById(usersFixtures.userList[0].id);
      expect(usersTable.get()).toEqual(expected);
    });

    it("Retorna usuário em formato 'withoutPassword'", () => {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(usersFixtures.userList),
      );
      const usersTable = new UsersTable();
      const expected = [
        {
          id: usersFixtures.userList[0].id,
          username: usersFixtures.userList[0].username,
        },
      ];

      usersTable.searchById(usersFixtures.userList[0].id);
      expect(usersTable.getInWithoutPasswordFormat()).toEqual(expected);
    });

    it("Retorna array vazio para id inexistente", () => {
      localStorage.setItem(
        config.localStorageKeys.users,
        JSON.stringify(usersFixtures.userList),
      );
      const usersTable = new UsersTable();

      usersTable.searchById("USR-000000000");
      expect(usersTable.get()).toEqual([]);
    });

    it("Cria usuário e persiste no localStorage", () => {
      const fixture = usersFixtures.user;
      const usersTable = new UsersTable();

      usersTable.createUser(fixture.id, fixture.creationPayload);
      usersTable.searchById(fixture.id);

      expect(usersTable.get()).toEqual(fixture.expected);
      expect(
        JSON.parse(localStorage.getItem(config.localStorageKeys.users) || ""),
      ).toEqual(fixture.expected);
    });

    it("Não cria usuário para id já cadastrado", () => {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(usersFixtures.userList),
      );
      const usersTable = new UsersTable();

      usersTable.createUser(usersFixtures.userList[0].id, {
        username: "new user",
        password: "9100",
      });

      expect(JSON.parse(localStorage.getItem(localStorageKey) || "")).toEqual(
        usersFixtures.userList,
      );
    });

    it("Não cria usuário para nome de usuário já cadastrado", () => {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(usersFixtures.userList),
      );
      const usersTable = new UsersTable();

      usersTable.createUser("USR-000000003", {
        username: usersFixtures.userList[0].username,
        password: "9100",
      });

      expect(JSON.parse(localStorage.getItem(localStorageKey) || "")).toEqual(
        usersFixtures.userList,
      );
    });

    it("Verifica se nome de usuário está cadastrado", () => {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(usersFixtures.userList),
      );
      const usersTable = new UsersTable();

      expect(
        usersTable.verifyIfExistsByUsername(usersFixtures.userList[0].username),
      ).toBe(true);
      expect(usersTable.verifyIfExistsByUsername("missing user")).toBe(false);
    });
  });

  describe("SessionsTable", () => {
    const localStorageKey = config.localStorageKeys.sessions;

    beforeEach(() => {
      vi.stubGlobal("localStorage", createLocalStorageMock());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("Inicializa localStorage vazio quando não existem sessões", () => {
      new SessionsTable();
      expect(localStorage.getItem(localStorageKey)).toBe("[]");
    });

    it("Retorna sessão para id existente", () => {
      const fixture = sessionsFixture.commomSession;
      localStorage.setItem(localStorageKey, JSON.stringify(fixture.expected));

      const sessionsTable = new SessionsTable();
      const expectedSession = sessionsFixture.commomSession.expected[0];

      sessionsTable.searchById(expectedSession.id);

      expect(sessionsTable.get()[0].id).toEqual(expectedSession.id);
      expect(sessionsTable.get()[0].userId).toEqual(expectedSession.userId);
      expect(sessionsTable.get()[0].startedAt).toBeTypeOf("number");
    });

    it("Retorna array vazio para id inexistente", () => {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(sessionsFixture.commomSession.expected),
      );
      const sessionsTable = new SessionsTable();

      sessionsTable.searchById("SES-000000000");
      expect(sessionsTable.get()).toEqual([]);
    });

    it("Cria a sessão e persiste no localStorage", () => {
      const payload = sessionsFixture.commomSession.payload;
      const expected = sessionsFixture.commomSession.expected[0];
      const sessionsTable = new SessionsTable();

      sessionsTable.createSession(payload.id, payload.userId);
      sessionsTable.searchById(expected.id);

      const sessionFromLocalstorage = JSON.parse(
        localStorage.getItem(localStorageKey) || "",
      );

      expect(sessionFromLocalstorage).toHaveLength(1);
      expect(sessionFromLocalstorage[0].id).toEqual(expected.id);
      expect(sessionFromLocalstorage[0].userId).toEqual(expected.userId);
      expect(sessionFromLocalstorage[0].startedAt).toBeTypeOf("number");
    });

    it("Remove a sessão do localStorage", () => {
      const payload = sessionsFixture.commomSession.payload;
      const sessionsTable = new SessionsTable();
      sessionsTable.createSession(payload.id, payload.userId);
      const sessionFromLocalstorage = JSON.parse(
        localStorage.getItem(localStorageKey) || "",
      );
      expect(sessionFromLocalstorage[0]).toBeDefined();
      sessionsTable.removeSession(payload.id);
      expect(localStorage.getItem(localStorageKey) || "").toEqual("[]");
    });

    it("Verifica se a sessão existe", () => {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(sessionsFixture.commomSession.expected),
      );
      const sessionsTable = new SessionsTable();

      expect(
        sessionsTable.verifyIfExistsById(
          sessionsFixture.commomSession.expected[0].id,
        ),
      ).toBe(true);
      expect(sessionsTable.verifyIfExistsById("SES-000000000")).toBe(false);
    });
  });
});

describe("PrimitiveValidations", () => {
  describe("productId", () => {
    it("Retorna true para ids de produto válidos", () => {
      expect(PrimitiveValidations.productId("PRO-012345678")).toBe(true);
      expect(PrimitiveValidations.productId("PRO-ABCDEF987")).toBe(true);
    });

    it("Retorna false para ids de produto inválidos", () => {
      expect(PrimitiveValidations.productId(12)).toBe(false);
      expect(PrimitiveValidations.productId(false)).toBe(false);
      expect(PrimitiveValidations.productId(true)).toBe(false);
      expect(PrimitiveValidations.productId("")).toBe(false);
      expect(PrimitiveValidations.productId(["PRO-ABCDEF987"])).toBe(false);
      expect(PrimitiveValidations.productId("ABCDEF987")).toBe(false);
      expect(PrimitiveValidations.productId("ABCDEF98798989")).toBe(false);
      expect(PrimitiveValidations.productId("pro-ABCDEF987")).toBe(false);
      expect(PrimitiveValidations.productId("PRO_ABCDEF987")).toBe(false);
      expect(PrimitiveValidations.productId("PRO-aBC123456")).toBe(false);
    });
  });
  describe("saleId", () => {
    it("Retorna true para ids de promoção válidos", () => {
      expect(PrimitiveValidations.saleId("SAL-012345")).toBe(true);
      expect(PrimitiveValidations.saleId("SAL-6789AB")).toBe(true);
      expect(PrimitiveValidations.saleId("SAL-CDEF12")).toBe(true);
    });

    it("Retorna false para ids de promoção inválidos", () => {
      expect(PrimitiveValidations.saleId(12)).toBe(false);
      expect(PrimitiveValidations.saleId(false)).toBe(false);
      expect(PrimitiveValidations.saleId(true)).toBe(false);
      expect(PrimitiveValidations.saleId("")).toBe(false);
      expect(PrimitiveValidations.saleId(["SAL-012345"])).toBe(false);
      expect(PrimitiveValidations.saleId("012345")).toBe(false);
      expect(PrimitiveValidations.saleId("ABCDEF")).toBe(false);
      expect(PrimitiveValidations.saleId("SAL_AB1C36")).toBe(false);
      expect(PrimitiveValidations.saleId("SAL-abc1d3")).toBe(false);
    });
  });
  describe("productFilterName", () => {
    it("Retorna true para nomes de produto válidos", () => {
      expect(PrimitiveValidations.productFilterName("valid product")).toBe(
        true,
      );
      expect(PrimitiveValidations.productFilterName("12")).toBe(true);
      expect(
        PrimitiveValidations.productFilterName(Array(200).fill("a").join("")),
      ).toBe(true);
    });

    it("Retorna false para nomes de produto inválidos", () => {
      expect(PrimitiveValidations.productFilterName(12)).toBe(false);
      expect(PrimitiveValidations.productFilterName(false)).toBe(false);
      expect(PrimitiveValidations.productFilterName(true)).toBe(false);
      expect(PrimitiveValidations.productFilterName(["wrong"])).toBe(false);
      expect(PrimitiveValidations.productFilterName("")).toBe(false);
      expect(PrimitiveValidations.productFilterName("A")).toBe(false);
      expect(
        PrimitiveValidations.productFilterName(Array(201).fill("a").join("")),
      ).toBe(false);
      expect(
        PrimitiveValidations.productFilterName(Array(250).fill("a").join("")),
      ).toBe(false);
    });
  });
  describe("productFilterCategory", () => {
    it("Retorna true para nomes de categoria válidos", () => {
      expect(PrimitiveValidations.productFilterCategory("valid category")).toBe(
        true,
      );
      expect(PrimitiveValidations.productFilterCategory("12")).toBe(true);
      expect(
        PrimitiveValidations.productFilterCategory(
          Array(30).fill("a").join(""),
        ),
      ).toBe(true);
    });

    it("Retorna false para nomes de categoria inválidos", () => {
      expect(PrimitiveValidations.productFilterCategory(12)).toBe(false);
      expect(PrimitiveValidations.productFilterCategory(false)).toBe(false);
      expect(PrimitiveValidations.productFilterCategory(true)).toBe(false);
      expect(PrimitiveValidations.productFilterCategory(["wrong"])).toBe(false);
      expect(PrimitiveValidations.productFilterCategory("")).toBe(false);
      expect(PrimitiveValidations.productFilterCategory("A")).toBe(false);
      expect(
        PrimitiveValidations.productFilterCategory(
          Array(31).fill("a").join(""),
        ),
      ).toBe(false);
      expect(
        PrimitiveValidations.productFilterCategory(
          Array(100).fill("a").join(""),
        ),
      ).toBe(false);
    });
  });
  describe("productFilterPrice", () => {
    it("Retorna true para preços válidos", () => {
      expect(PrimitiveValidations.productFilterPrice(1234567)).toBe(true);
      expect(PrimitiveValidations.productFilterPrice(2999)).toBe(true);
      expect(PrimitiveValidations.productFilterPrice(0)).toBe(true);
      expect(PrimitiveValidations.productFilterPrice(9999999)).toBe(true);
    });

    it("Retorna false para preços inválidos", () => {
      expect(PrimitiveValidations.productFilterPrice("124")).toBe(false);
      expect(PrimitiveValidations.productFilterPrice(false)).toBe(false);
      expect(PrimitiveValidations.productFilterPrice(true)).toBe(false);
      expect(PrimitiveValidations.productFilterPrice(["wrong"])).toBe(false);
      expect(PrimitiveValidations.productFilterPrice("")).toBe(false);
      expect(PrimitiveValidations.productFilterPrice("A")).toBe(false);
      expect(PrimitiveValidations.productFilterPrice(-4)).toBe(false);
      expect(PrimitiveValidations.productFilterPrice(10000000)).toBe(false);
      expect(PrimitiveValidations.productFilterPrice(12.5)).toBe(false);
      expect(PrimitiveValidations.productFilterPrice(0.988)).toBe(false);
    });
  });
  describe("productFilterTag", () => {
    it("Retorna true para tags de produto válidos", () => {
      expect(PrimitiveValidations.productFilterTag("valid tag")).toBe(true);
      expect(PrimitiveValidations.productFilterTag("12")).toBe(true);
      expect(
        PrimitiveValidations.productFilterTag(Array(30).fill("a").join("")),
      ).toBe(true);
    });

    it("Retorna false para tags de produto inválidos", () => {
      expect(PrimitiveValidations.productFilterTag(12)).toBe(false);
      expect(PrimitiveValidations.productFilterTag(false)).toBe(false);
      expect(PrimitiveValidations.productFilterTag(true)).toBe(false);
      expect(PrimitiveValidations.productFilterTag(["wrong"])).toBe(false);
      expect(PrimitiveValidations.productFilterTag("")).toBe(false);
      expect(PrimitiveValidations.productFilterTag("A")).toBe(false);
      expect(
        PrimitiveValidations.productFilterTag(Array(31).fill("a").join("")),
      ).toBe(false);
      expect(
        PrimitiveValidations.productFilterTag(Array(100).fill("a").join("")),
      ).toBe(false);
    });
  });
  describe("productSort", () => {
    it("Retorna true para ordenamentos válidos", () => {
      expect(PrimitiveValidations.productSort("increasingPrice")).toBe(true);
      expect(PrimitiveValidations.productSort("decreasingPrice")).toBe(true);
      expect(PrimitiveValidations.productSort("alphabetical")).toBe(true);
    });

    it("Retorna false para ordenamentos inválidos", () => {
      expect(PrimitiveValidations.productSort(12)).toBe(false);
      expect(PrimitiveValidations.productSort(false)).toBe(false);
      expect(PrimitiveValidations.productSort(true)).toBe(false);
      expect(PrimitiveValidations.productSort(["wrong"])).toBe(false);
      expect(PrimitiveValidations.productSort("")).toBe(false);
      expect(PrimitiveValidations.productSort("IncreasingPrice")).toBe(false);
      expect(PrimitiveValidations.productSort("DecreasingPrice")).toBe(false);
    });
  });
  describe("productFormat", () => {
    it("Retorna true para formatos válidos", () => {
      expect(PrimitiveValidations.productFormat("full")).toBe(true);
      expect(PrimitiveValidations.productFormat("price")).toBe(true);
      expect(PrimitiveValidations.productFormat("suggestion")).toBe(true);
      expect(PrimitiveValidations.productFormat("card")).toBe(true);
    });

    it("Retorna false para formatos inválidos", () => {
      expect(PrimitiveValidations.productFormat(12)).toBe(false);
      expect(PrimitiveValidations.productFormat(false)).toBe(false);
      expect(PrimitiveValidations.productFormat(true)).toBe(false);
      expect(PrimitiveValidations.productFormat(["wrong"])).toBe(false);
      expect(PrimitiveValidations.productFormat("")).toBe(false);
      expect(PrimitiveValidations.productFormat("Card")).toBe(false);
      expect(PrimitiveValidations.productFormat("Suggestion")).toBe(false);
    });
  });
  describe("username", () => {
    it("Retorna true para nomes de usuário válidos", () => {
      expect(PrimitiveValidations.username("valid username")).toBe(true);
      expect(PrimitiveValidations.username("valid username")).toBe(true);
      expect(PrimitiveValidations.username("valid username 123")).toBe(true);
      expect(PrimitiveValidations.username("validusername")).toBe(true);
      expect(PrimitiveValidations.username("VALID USERNAME")).toBe(true);
      expect(PrimitiveValidations.username("VALID USERNAME 123")).toBe(true);
      expect(PrimitiveValidations.username("abc")).toBe(true);
      expect(PrimitiveValidations.username(" abc")).toBe(true);
      expect(PrimitiveValidations.username(" abc ")).toBe(true);
      expect(PrimitiveValidations.username(Array(30).fill("0").join(""))).toBe(
        true,
      );
    });

    it("Retorna false para nomes de usuário inválidos", () => {
      expect(PrimitiveValidations.username(12)).toBe(false);
      expect(PrimitiveValidations.username(false)).toBe(false);
      expect(PrimitiveValidations.username(true)).toBe(false);
      expect(PrimitiveValidations.username(["wrong"])).toBe(false);
      expect(PrimitiveValidations.username("")).toBe(false);
      expect(PrimitiveValidations.username("ab")).toBe(false);
      expect(PrimitiveValidations.username(" ab")).toBe(false);
      expect(PrimitiveValidations.username("ab ")).toBe(false);
      expect(PrimitiveValidations.username(" ab ")).toBe(false);
      expect(PrimitiveValidations.username("invalid_username")).toBe(false);
      expect(PrimitiveValidations.username("invalid-username")).toBe(false);
      expect(PrimitiveValidations.username("ínvalid username")).toBe(false);
      expect(PrimitiveValidations.username(Array(31).fill("a").join(""))).toBe(
        false,
      );
    });
  });
  describe("password", () => {
    it("Retorna true para senhas válidas", () => {
      expect(PrimitiveValidations.password("1234")).toBe(true);
      expect(PrimitiveValidations.password("5678")).toBe(true);
      expect(PrimitiveValidations.password("9100")).toBe(true);
      expect(PrimitiveValidations.password("0000")).toBe(true);
    });

    it("Retorna false para senhas inválidas", () => {
      expect(PrimitiveValidations.password(12)).toBe(false);
      expect(PrimitiveValidations.password(1234)).toBe(false);
      expect(PrimitiveValidations.password(false)).toBe(false);
      expect(PrimitiveValidations.password(true)).toBe(false);
      expect(PrimitiveValidations.password(["wrong"])).toBe(false);
      expect(PrimitiveValidations.password("")).toBe(false);
      expect(PrimitiveValidations.password("123")).toBe(false);
      expect(PrimitiveValidations.password("12345")).toBe(false);
      expect(PrimitiveValidations.password("abcd")).toBe(false);
      expect(PrimitiveValidations.password("ab3d")).toBe(false);
      expect(PrimitiveValidations.password(" 1234")).toBe(false);
      expect(PrimitiveValidations.password(" 1234 ")).toBe(false);
      expect(PrimitiveValidations.password("1234 ")).toBe(false);
    });
  });
});

describe("Validations", () => {
  function responseErrorMessage(response: FakeAPIResponse) {
    const res = response.getResponse();
    if (res.success) return "";
    return res.error.message;
  }

  describe("productQuery", () => {
    const res = new FakeAPIResponse();

    it("Retorna true para consultas válidas", () => {
      expect(
        Validations.productQuery(res, {
          filter: {
            name: "Test",
          },
          format: "full",
        }),
      ).toBe(true);
      expect(
        Validations.productQuery(res, {
          filter: {
            name: "Test",
          },
          sort: "increasingPrice",
          format: "card",
        }),
      ).toBe(true);
    });

    it("Retorna erro para consultas inválidas", () => {
      expect(Validations.productQuery(res, 12)).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_QUERY_INVALID,
      );

      expect(Validations.productQuery(res, "12")).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_QUERY_INVALID,
      );

      expect(Validations.productQuery(res, true)).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_QUERY_INVALID,
      );

      expect(Validations.productQuery(res, {})).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_QUERY_INVALID,
      );

      expect(Validations.productQuery(res, { sort: "increasingPrice" })).toBe(
        false,
      );
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_QUERY_WITHOUT_FILTER,
      );

      expect(Validations.productQuery(res, { filter: { name: "test" } })).toBe(
        false,
      );
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_QUERY_WITHOUT_FORMAT,
      );

      expect(
        Validations.productQuery(res, {
          filter: { name: "test" },
          format: "invalid",
        }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_QUERY_INVALID_FORMAT,
      );

      expect(
        Validations.productQuery(res, {
          filter: { name: "test" },
          format: "full",
          sort: 1,
        }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_QUERY_INVALID_SORT,
      );
    });
  });

  describe("productQueryFilter", () => {
    const res = new FakeAPIResponse();

    it("Retorna true para filtros válidos", () => {
      expect(
        // @ts-expect-error test
        Validations.productQueryFilter(res, {
          name: "Test",
        }),
      ).toBe(true);
      expect(
        // @ts-expect-error test
        Validations.productQueryFilter(res, {
          name: "test",
          saleId: "SAL-123456",
        }),
      ).toBe(true);
      expect(
        // @ts-expect-error test
        Validations.productQueryFilter(res, {
          minValue: 123,
          maxValue: 123,
        }),
      ).toBe(true);
      expect(
        // @ts-expect-error test
        Validations.productQueryFilter(res, {
          tags: ["test", "test"],
        }),
      ).toBe(true);
      expect(
        // @ts-expect-error test
        Validations.productQueryFilter(res, {
          name: "test",
          saleId: "SAL-123ABC",
          category: "test",
          minPrice: 0,
          maxPrice: 999999,
          tags: ["test", "test", "test", "test"],
        }),
      ).toBe(true);
    });

    it("Retorna erro para filtros inválidos", () => {
      // @ts-expect-error test
      expect(Validations.productQueryFilter(res, {})).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_FILTER_INVALID_FILTER,
      );

      // @ts-expect-error test
      expect(Validations.productQueryFilter(res, { name: "w" })).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_FILTER_INVALID_NAME,
      );

      expect(
        // @ts-expect-error test
        Validations.productQueryFilter(res, { saleId: "SAL-12a456" }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_FILTER_INVALID_SALE_ID,
      );

      // @ts-expect-error test
      expect(Validations.productQueryFilter(res, { category: "a" })).toBe(
        false,
      );
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_FILTER_INVALID_CATEGORY,
      );

      // @ts-expect-error test
      expect(Validations.productQueryFilter(res, { minPrice: "255" })).toBe(
        false,
      );
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_FILTER_INVALID_MIN_PRICE,
      );

      // @ts-expect-error test
      expect(Validations.productQueryFilter(res, { maxPrice: "255" })).toBe(
        false,
      );
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_FILTER_INVALID_MAX_PRICE,
      );

      // @ts-expect-error test
      expect(Validations.productQueryFilter(res, { tags: "wrong" })).toBe(
        false,
      );
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_FILTER_INVALID_TAGS,
      );

      expect(
        // @ts-expect-error test
        Validations.productQueryFilter(res, {
          tags: ["abc", "abc", "abc", "abc", "abc"],
        }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.PRODUCT_FILTER_INVALID_TAGS,
      );
    });
  });

  describe("userCreationPayload", () => {
    const res = new FakeAPIResponse();

    it("Retorna true para criações de usuário válidas", () => {
      expect(
        Validations.userCreationPayload(res, {
          username: "valid username",
          password: "1234",
        }),
      ).toBe(true);
    });

    it("Retorna erro para criações de usuário inválidas", () => {
      expect(Validations.userCreationPayload(res, 1)).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_CREATION_INVALID_PAYLOAD,
      );

      expect(Validations.userCreationPayload(res, "invalid")).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_CREATION_INVALID_PAYLOAD,
      );

      expect(Validations.userCreationPayload(res, false)).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_CREATION_INVALID_PAYLOAD,
      );

      expect(Validations.userCreationPayload(res, true)).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_CREATION_INVALID_PAYLOAD,
      );

      expect(Validations.userCreationPayload(res, {})).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_CREATION_INVALID_PAYLOAD,
      );

      expect(Validations.userCreationPayload(res, {})).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_CREATION_INVALID_PAYLOAD,
      );

      expect(
        Validations.userCreationPayload(res, {
          invalidProp: "invalid prop",
        }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_CREATION_INVALID_USERNAME,
      );

      expect(
        Validations.userCreationPayload(res, {
          username: "valid username",
        }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_CREATION_INVALID_PASSWORD,
      );

      expect(
        Validations.userCreationPayload(res, {
          password: "1234",
        }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_CREATION_INVALID_USERNAME,
      );
    });
  });

  describe("loginPayload", () => {
    const res = new FakeAPIResponse();

    it("Retorna true para payloads de login válidos", () => {
      expect(
        Validations.loginPayload(res, {
          username: "valid username",
          password: "1234",
        }),
      ).toBe(true);
    });

    it("Retorna erro para payloads de login inválidos", () => {
      expect(Validations.loginPayload(res, 1)).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_LOGIN_INVALID_PAYLOAD,
      );

      expect(Validations.loginPayload(res, "invalid")).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_LOGIN_INVALID_PAYLOAD,
      );

      expect(Validations.loginPayload(res, false)).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_LOGIN_INVALID_PAYLOAD,
      );

      expect(Validations.loginPayload(res, true)).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_LOGIN_INVALID_PAYLOAD,
      );

      expect(Validations.loginPayload(res, {})).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_LOGIN_INVALID_PAYLOAD,
      );

      expect(Validations.loginPayload(res, {})).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_LOGIN_INVALID_PAYLOAD,
      );

      expect(
        Validations.loginPayload(res, {
          invalidProp: "invalid prop",
        }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_LOGIN_INVALID_USERNAME,
      );

      expect(
        Validations.loginPayload(res, {
          username: "valid username",
        }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_LOGIN_INVALID_PASSWORD,
      );

      expect(
        Validations.loginPayload(res, {
          password: "1234",
        }),
      ).toBe(false);
      expect(responseErrorMessage(res)).toBe(
        ErrorMessages.USER_LOGIN_INVALID_USERNAME,
      );
    });
  });
});
