export default function exclusionFilter<T>(
  array: T[],
  filter: (item: T) => boolean
) {
  let index = 0;
  while (array[index] !== undefined) {
    if (filter(array[index])) {
      array.splice(index, 1);
      continue;
    }
    index++;
  }
}
