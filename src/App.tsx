import { useEffect, useState } from 'react';

import { MoviesList, MovieProps } from './components';
import './App.css';

const API =
  'https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&page=1';

function App() {
  const [moviesInTheater, setMoviesInTheater] = useState<MovieProps[]>([]);

  useEffect(() => {
    const fetchMoviesInTheaters = async () => {
      const request = await fetch(API);
      const response = await request.json();

      setMoviesInTheater(response.results);
    };

    fetchMoviesInTheaters();
  }, []);

  return (
    <div>
      <MoviesList movies={moviesInTheater} />
    </div>
  );
}

export default App;
