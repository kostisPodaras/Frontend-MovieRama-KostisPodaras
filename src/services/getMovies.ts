import { Movie } from 'types';

import { API_NOW_PLAYING } from '../API';

export const getMovies = async (
  pageNumber: number,
): Promise<{
  data: Movie[];
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
