// @ts-ignore: Unreachable code error
export const getUniqueElements = (array, filterByProperty) =>
  array.filter(
    // @ts-ignore: Unreachable code error
    (value, index, self) =>
      self.findIndex(
        // @ts-ignore: Unreachable code error
        (v) =>
          v[filterByProperty] === value[filterByProperty] &&
          v[filterByProperty] === value[filterByProperty],
      ) === index,
  );
