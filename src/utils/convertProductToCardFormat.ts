import type { TProduct } from "../app.types";

export function convertProductToCardFormat(
  product: TProduct["default"],
): TProduct["card"] {
  const result: TProduct["card"] = {
    id: product.id,
    name: product.name,
    price: product.price,
    media: {
      thumb: product.media.thumb,
    },
  };
  if (product.sale) {
    result.sale = {
      id: product.sale.id,
      name: product.sale.name,
      expiration: product.sale.expiration,
      discont: product.sale.discont,
    };
  }
  return result;
}
