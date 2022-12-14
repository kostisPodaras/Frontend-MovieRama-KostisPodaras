import {
  getUniqueElements,
  arrayOfObjectsToDictionary,
  matchGenresIdsWithGenres,
} from '..';

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
    const result = arrayOfObjectsToDictionary(array, groupProperty);

    // THEN
    expect(result).toEqual({
      '12': { id: 12, result: { name: 'Adventure', totalMovies: 471 } },
      '16': { id: 16, result: { name: 'Animation', totalMovies: 5 } },
      '28': { id: 28, result: { name: 'Action', totalMovies: 132 } },
    });
  });
});

describe('matchGenresIdsWithGenres function', () => {
  test('Should return a new array enhanced with the provided property', () => {
    // GIVEN
    const moviesArray = [
      { genre_ids: [12], id: 436270, title: 'Black Adam' },
      { genre_ids: [12, 14], id: 724495, title: 'The Woman King' },
      {
        genre_ids: [23, 12],
        id: 505642,
        title: 'Black Panther: Wakanda Forever',
      },
    ];

    const genresDictionary = {
      '12': { name: 'Adventure' },
      '14': { name: 'Fantasy' },
      '23': { name: 'Thriller' },
    };

    // WHEN
    const result = matchGenresIdsWithGenres(moviesArray, genresDictionary);

    // THEN
    expect(result).toEqual([
      {
        title: 'Black Adam',
        genre_ids: [12],
        id: 436270,
        genres: ['Adventure'],
      },
      {
        title: 'The Woman King',
        genre_ids: [12, 14],
        id: 724495,
        genres: ['Adventure', 'Fantasy'],
      },
      {
        title: 'Black Panther: Wakanda Forever',
        genre_ids: [23, 12],
        id: 505642,
        genres: ['Thriller', 'Adventure'],
      },
    ]);
  });
});
