import { useState, useCallback, useRef, useMemo } from 'react';
import useMovies from './hooks/useMovies';
import useGenres from './hooks/useGenres';
import { MoviesList, Search } from './components';
import { arrayOfObjectsToDictionary } from './utils';
import './App.css';

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { results, isError, isLoading, hasNextPage } = useMovies(pageNumber);
  const { genres, genresIsError } = useGenres();

  // Transforming array of objects to dictionary so we dont have to iterate for each movie multiple times to find the correct genre based on id. After a while it will get pretty heavy
  const genresDictionary = useMemo(
    () => arrayOfObjectsToDictionary(genres, 'id'),
    // ASK Jim for this. I want to call this ONLY when genres data are fetched, so is this a smart way?
    [genres.length > 0],
  );

  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useCallback(
    (movie: HTMLDivElement) => {
      if (isLoading) return;

      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }

      intersectionObserver.current = new IntersectionObserver((movies) => {
        if (movies[0].isIntersecting && hasNextPage) {
          setPageNumber((prev) => prev + 1);
        }
      });

      if (movie) intersectionObserver.current.observe(movie);
    },
    [isLoading, hasNextPage],
  );

  if (isError || genresIsError) {
    return <h1>Something went wrong</h1>;
  }

  const moviesWithGenres = results.map((movie) => {
    const movieGenres = movie.genre_ids.map((id) => genresDictionary[id]?.name);

    return {
      ...movie,
      genres: movieGenres,
    };
  });

  return (
    <div className="App">
      <Search />
      <MoviesList movies={moviesWithGenres} lastMovieRef={lastMovieRef} />
    </div>
  );
};

export default App;
