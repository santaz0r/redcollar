export const splitArr = (arr, size) => {
  const firstPart = arr.slice(0, size);
  const secondPart = arr.slice(size);
  return [firstPart, secondPart];
};
