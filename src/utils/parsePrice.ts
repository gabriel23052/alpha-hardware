export default function (price: number) {
  return (price / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });
}
