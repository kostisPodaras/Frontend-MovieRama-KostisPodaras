import { useEffect, useState } from 'react';

import { Movie } from 'types';

import { getUniqueElements } from '../utils';
import { getMovies } from '../services';

export const useMovies = (pageNumber = 1, query: string) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [prevQuery, setPrevQuery] = useState(query);

  useEffect(() => {
    // Condition so we dont make requests for now_playing_movies when we are on search and pageNumber change
    if (!query) {
      setIsLoading(true);
      setIsError(false);

      const isQueryChanged = query !== prevQuery;

      getMovies(isQueryChanged ? 1 : pageNumber)
        .then(({ data, isLastPage }) => {
          setResults((prev: Movie[]) => {
            // Filtering out duplicate movies, seems pages from API contain duplicate movies
            const uniqueMovies = getUniqueElements([...prev, ...data], 'id');

            return uniqueMovies;
          });
          setHasNextPage(!isLastPage);
          setIsLoading(false);
        })
        .catch((error) => {
          console.warn(error);
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [pageNumber]);

  return {
    theaterMovies: results,
    theaterMoviesIsLoading: isLoading,
    theaterMoviesIsError: isError,
    theaterMoviesHasNextPage: hasNextPage,
  };
};
