export const moveToFirst = (array, element) => {
  const newArr = [...array];
  const index = newArr.findIndex((i) => i.id === element.id);

  if (index !== -1) {
    const [itemToMove] = newArr.splice(index, 1);
    newArr.unshift(itemToMove);
  }

  return newArr;
};
