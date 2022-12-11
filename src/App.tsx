import { useState, useCallback, useRef, useMemo } from 'react';
import useMovies from './hooks/useMovies';
import { MoviesList, Search } from './components';
import './App.css';

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { results, isError, isLoading, hasNextPage } = useMovies(pageNumber);

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

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="App">
      <Search />
      <MoviesList movies={results} lastMovieRef={lastMovieRef} />
    </div>
  );
};

export default App;
