import { useEffect, useState } from 'react';
import { API_GENRES } from '../API';

interface Genre {
  id: number;
  name: string;
}

export const useGenres = (): {
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
        const response = await fetch(API_GENRES);
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
