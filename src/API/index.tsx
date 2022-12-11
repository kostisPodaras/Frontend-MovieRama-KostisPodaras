const API_KEY = process.env.REACT_APP_API_KEY;

export const API_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

export const API_NOW_PLAYING = (pageNumber) =>
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
