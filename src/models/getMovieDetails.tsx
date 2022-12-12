import { API_MOVIE_DETAILS } from '../API';

export const getMovieDetails = async (movieId: string) => {
  const response = await fetch(API_MOVIE_DETAILS(movieId));
  const data = await response.json();

  return data;
};
