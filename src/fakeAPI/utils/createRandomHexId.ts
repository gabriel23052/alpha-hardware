function createRandomHexId(prefix: string, length: number) {
  const id = Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16),
  )
    .join("")
    .toUpperCase();

  return `${prefix}-${id}`;
}

export { createRandomHexId };
