import { useEffect, useState } from 'react';

interface Genre {
  id: number;
  name: 'string';
}

const useGenres = (): {
  genres: Genre[];
  genresIsError: boolean;
  genresIsLoading: boolean;
} => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genresIsError, setGenresIsError] = useState(false);
  const [genresIsLoading, setGenresIsLoading] = useState(false);

  useEffect(() => {
    try {
      setGenresIsLoading(true);

      const fetchGenres = async () => {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US',
        );
        const data = await response.json();

        setGenres(data.genres);
        setGenresIsLoading(false);
      };
      fetchGenres();
    } catch (error) {
      setGenresIsError(true);
      console.warn(error);
    }
  }, []);

  return {
    genres,
    genresIsLoading,
    genresIsError,
  };
};

export default useGenres;
