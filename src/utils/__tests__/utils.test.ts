import { getUniqueElements, arrayOfObjectsToDictionary } from '..';

describe('getUniqueElements function', () => {
  test('should return a new array without duplicate objects based on same provided property', () => {
    // GIVEN
    const arr = [
      { id: 1, name: 'mock name 1' },
      { id: 2, name: 'mock name 2' },
      { id: 3, name: 'mock name 3' },
      { id: 2, name: 'mock name 4' },
      { id: 1, name: 'mock name 5' },
    ];
    const filterPropert = 'id';

    // WHEN
    const result = getUniqueElements(arr, filterPropert);

    // THEN
    expect(result).toEqual([
      { id: 1, name: 'mock name 1' },
      { id: 2, name: 'mock name 2' },
      { id: 3, name: 'mock name 3' },
    ]);
  });

  test('should return a new array same as the original if no duplicates', () => {
    // GIVEN
    const arr = [
      { id: 1, name: 'mock name 1' },
      { id: 2, name: 'mock name 2' },
      { id: 3, name: 'mock name 3' },
    ];
    const filterPropert = 'id';

    // WHEN
    const result = getUniqueElements(arr, filterPropert);

    // THEN
    expect(result).toEqual(arr);
  });
});

describe('arrayOfObjectsToDictionary function', () => {
  test('Should transform an array to dictionary with key the provided one, and value the element itself', () => {
    // GIVEN
    const array = [
      {
        id: 28,
        result: {
          name: 'Action',
          totalMovies: 132,
        },
      },
      {
        id: 12,
        result: {
          name: 'Adventure',
          totalMovies: 471,
        },
      },
      {
        id: 16,
        result: {
          name: 'Animation',
          totalMovies: 5,
        },
      },
    ];
    const groupProperty = 'id';

    // WHEN
    const result = getUniqueElements(array, groupProperty);

    // THEN
    expect(result).toEqual([
      { id: 28, result: { name: 'Action', totalMovies: 132 } },
      { id: 12, result: { name: 'Adventure', totalMovies: 471 } },
      { id: 16, result: { name: 'Animation', totalMovies: 5 } },
    ]);
  });
});
