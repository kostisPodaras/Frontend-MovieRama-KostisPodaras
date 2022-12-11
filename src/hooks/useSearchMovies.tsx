import { useEffect, useState } from 'react';
import { MovieProps } from '../components/movies-list/MoviesList';
import { getUniqueElements } from '../utils';
import { searchMovies } from '../models';

const useSearchMovies = (pageNumber = 1, query: string) => {
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

  return {
    queryResults,
    queryIsLoading,
    queryIsError,
    queryHasNextPage,
  };
};

export default useSearchMovies;
