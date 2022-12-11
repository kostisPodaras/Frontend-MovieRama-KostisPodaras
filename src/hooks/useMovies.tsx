import { useEffect, useState } from 'react';
import { MovieProps } from '../components/movies-list/MoviesList';
import { getUniqueElements } from '../utils';
import { getMovies, searchMovies } from '../models';

const useMovies = (pageNumber = 1, query: string) => {
  const [results, setResults] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    // Condition so we dont make requests for now_playing_movies when we are on search and pageNumber change
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
    theaterMovies: results,
    theaterMoviesIsLoading: isLoading,
    theaterMoviesIsError: isError,
    theaterMoviesHasNextPage: hasNextPage,
  };
};

export default useMovies;
