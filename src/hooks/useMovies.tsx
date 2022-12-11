import { useEffect, useState } from 'react';
import { MovieProps } from '../components/movies-list/MoviesList';
import { getUniqueElements } from '../utils';
import { API_NOW_PLAYING } from '../API';

const getMovies = async (
  pageNumber: number,
): Promise<{
  data: MovieProps[];
  isLastPage: boolean;
}> => {
  const response = await fetch(API_NOW_PLAYING(pageNumber));
  const data = await response.json();

  const isLastPage = data.page === data.total_pages;

  return {
    data: data.results,
    isLastPage,
  };
};

const useMovies = (pageNumber = 1) => {
  const [results, setResults] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
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
  }, [pageNumber]);

  return { results, isLoading, isError, hasNextPage };
};

export default useMovies;
