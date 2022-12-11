import { useState, useCallback, useRef } from 'react';
import useMovies from './hooks/useMovies';
import useSearchMovies from './hooks/useSearchMovies';
import { MoviesList, Search, Spinner } from './components';
import './App.css';

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const {
    theaterMovies,
    theaterMoviesIsError,
    theaterMoviesIsLoading,
    theaterMoviesHasNextPage,
  } = useMovies(pageNumber, query);

  const { queryResults, queryIsError, queryIsLoading, queryHasNextPage } =
    useSearchMovies(pageNumber, query);

  const results = query ? queryResults : theaterMovies;
  const isError = query ? queryIsError : theaterMoviesIsError;
  const hasNextPage = query ? queryHasNextPage : theaterMoviesHasNextPage;
  const isLoading = query ? queryIsLoading : theaterMoviesIsLoading;

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

  console.log('isLoading', isLoading);

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="App">
      <Search query={query} setQuery={setQuery} />

      {queryIsLoading && <Spinner />}

      <MoviesList movies={results} lastMovieRef={lastMovieRef} />
    </div>
  );
};

export default App;
