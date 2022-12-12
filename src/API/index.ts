const API_KEY = process.env.REACT_APP_API_KEY;

export const API_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

export const API_NOW_PLAYING = (pageNumber) =>
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;

export const API_SEARCH_MOVIES = (query, pageNumber) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`;

export const API_MOVIE_DETAILS = (movieId) =>
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,reviews,similar`;
