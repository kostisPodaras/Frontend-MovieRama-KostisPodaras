import { useEffect, useState } from 'react';
import { MovieProps } from '../components/movies-list/MoviesList';
import { getUniqueElements } from '../utils';

const getMovies = async (
  pageNumber: number,
): Promise<{
  data: MovieProps[];
  isLastPage: boolean;
}> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&page=${pageNumber}`,
  );
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
