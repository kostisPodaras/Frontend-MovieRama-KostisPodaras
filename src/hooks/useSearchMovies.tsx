import { useEffect, useState } from 'react';
import { MovieProps } from '../components/movies-list/MoviesList';
import { getUniqueElements } from '../utils';
import { searchMovies } from '../services';

export const useSearchMovies = (pageNumber = 1, query: string) => {
  const [queryResults, setQueryResults] = useState<MovieProps[]>([]);
  const [queryIsError, setQueryIsError] = useState(false);
  const [queryIsLoading, setQueryIsLoading] = useState(false);
  const [queryHasNextPage, setQueryHasNextPage] = useState(false);
  const [prevQuery, setPrevQuery] = useState(query);

  useEffect(() => {
    if (query) {
      setQueryIsLoading(true);
      setQueryIsError(false);

      const isQueryChanged = query !== prevQuery;

      const debounce = setTimeout(() => {
        // When we type again, we reset the pageNumber. (Bug was If we scroll to bottom and go to page 2, then scrolling back up and typing, will search th results of page 2)
        searchMovies(isQueryChanged ? 1 : pageNumber, query)
          .then(({ data, isLastPage }) => {
            setQueryResults((prev: MovieProps[]) => {
              // Filtering out duplicate movies, seems pages from API contain duplicate movies
              const uniqueMovies =
                // If query change, show only the new movies without the prev movies
                isQueryChanged
                  ? getUniqueElements(data, 'id')
                  : getUniqueElements([...prev, ...data], 'id');

              return uniqueMovies;
            });
            setPrevQuery(query);
            setQueryHasNextPage(!isLastPage);
            setQueryIsLoading(false);
          })
          .catch((error) => {
            console.warn(error);
            setQueryIsLoading(false);
            setQueryIsError(true);
          });
      }, 800);

      return () => {
        clearTimeout(debounce);
      };
    }
  }, [pageNumber, query]);

  return {
    queryResults,
    queryIsLoading,
    queryIsError,
    queryHasNextPage,
  };
};
