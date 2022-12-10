import { useState } from 'react';
import useMovies from './hooks/useMovies';
import { MoviesList } from './components';

import './App.css';

const API = `https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&page=1`;

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { results, isError } = useMovies(pageNumber);

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="App">
      <MoviesList movies={results} />
    </div>
  );
};

export default App;
