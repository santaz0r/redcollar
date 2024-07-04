const transformObjectValues = (obj, func) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, func(value)]));
};

export default transformObjectValues;
