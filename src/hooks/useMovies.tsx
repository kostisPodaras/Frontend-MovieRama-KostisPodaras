import { useEffect, useState } from 'react';
import { MovieProps } from '../components/movies-list/MoviesList';
import { getUniqueElements } from '../utils';
import { getMovies, searchMovies } from '../models';

const useMovies = (pageNumber = 1, query: string) => {
  const [results, setResults] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [queryResults, setQueryResults] = useState<MovieProps[]>([]);
  const [queryIsError, setQueryIsError] = useState(false);
  const [queryIsLoading, setQueryIsLoading] = useState(false);
  const [queryHasNextPage, setQueryHasNextPage] = useState(false);

  useEffect(() => {
    // Otan allazei to query, setQueryResults(data). Kai otan allazei to pageNumber tote setQueryResults(da[...prev, ...data]ta)
    if (query) {
      setQueryIsLoading(true);
      setQueryIsError(false);

      searchMovies(pageNumber, query)
        .then(({ data, isLastPage }) => {
          setQueryResults((prev: MovieProps[]) => {
            // Filtering out duplicate movies, seems pages from API contain duplicate movies
            const uniqueMovies = getUniqueElements([...prev, ...data], 'id');

            return uniqueMovies;
          });
          setQueryHasNextPage(!isLastPage);
          setQueryIsLoading(false);
        })
        .catch((error) => {
          console.warn(error);
          setQueryIsLoading(false);
          setQueryIsError(true);
        });
    }
  }, [pageNumber, query]);

  useEffect(() => {
    if (!query) {
      setIsLoading(true);
      setIsError(false);

      getMovies(pageNumber)
        .then(({ data, isLastPage }) => {
          setResults((prev: MovieProps[]) => {
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
    results: query ? queryResults : results,
    isLoading: query ? queryIsLoading : isLoading,
    isError: query ? queryIsError : isError,
    hasNextPage: query ? queryHasNextPage : hasNextPage,
  };
};

export default useMovies;
