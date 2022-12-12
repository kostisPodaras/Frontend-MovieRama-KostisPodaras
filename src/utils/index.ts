export const getUniqueElements = (arr: any[], filterProperty: string) =>
  arr.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t[filterProperty] === value[filterProperty]),
  );

export const arrayOfObjectsToDictionary = (arr, property) =>
  arr.reduce((obj, element) => {
    obj[element[property]] = { ...element };

    return obj;
  }, {});
