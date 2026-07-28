export function convertProductToCardFormat(
  product: IProduct_Full,
): IProduct_Card {
  const result: IProduct_Card = {
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
