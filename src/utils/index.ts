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

export const matchGenresIdsWithGenres = (array, dictionary, key = 'genres') =>
  array.map((movie) => {
    console.log('movieGenres', movie);
    const movieGenres = movie.genre_ids.map((id) => ({
      value: dictionary[id].name,
      id,
    }));

    return {
      ...movie,
      [key]: movieGenres,
    };
  });
