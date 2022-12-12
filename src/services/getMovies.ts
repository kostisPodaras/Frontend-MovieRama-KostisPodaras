import { MovieProps } from '../components/movies-list/MoviesList';
import { API_NOW_PLAYING } from '../API';

export const getMovies = async (
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
