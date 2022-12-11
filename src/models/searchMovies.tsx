import { MovieProps } from '../components/movies-list/MoviesList';
import { API_SEARCH_MOVIES } from '../API';

export const searchMovies = async (
  pageNumber: number,
  query: string,
): Promise<{
  data: MovieProps[];
  isLastPage: boolean;
}> => {
  const response = await fetch(API_SEARCH_MOVIES(query, pageNumber));
  const data = await response.json();

  const isLastPage = data.page >= data.total_pages;

  return {
    data: data.results,
    isLastPage,
  };
};
