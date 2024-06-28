const isInRange = (arr, x) => {
  const [lowerBound, upperBound] = arr;
  return x >= lowerBound && x <= upperBound;
};

export default isInRange;
