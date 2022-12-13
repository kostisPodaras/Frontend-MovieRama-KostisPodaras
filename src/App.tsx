import { useState, useCallback, useRef, useMemo, useEffect } from 'react';

import { MoviesList, Search, Spinner, ScrollToTop } from './components';
import { useSearchMovies, useMovies } from './hooks';
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

  // Using memo for referencial equality for the memoization of MoviesList. Each keystroke triggers a re-render and MoviesList is a "heavy" component.
  const movies = useMemo(() => {
    return results;
  }, [JSON.stringify(results)]);

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="App">
      <Search query={query} setQuery={setQuery} />
      {isLoading && <Spinner />}

      <MoviesList movies={movies} lastMovieRef={lastMovieRef} />

      <ScrollToTop />
      {isLoading && results.length > 0 && <Spinner />}
    </div>
  );
};

export default App;
