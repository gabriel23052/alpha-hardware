function convertTextPrice(textPrice: string) {
  return Math.floor(Number(textPrice.replace(",", ".")) * 100);
}

export { convertTextPrice };
