import { describe, expect, test } from "vitest";

import { isRequestBody } from "@fakeAPI/isRequestBody";

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
