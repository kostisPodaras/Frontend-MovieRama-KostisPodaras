import { useEffect, useState } from 'react';

import { API_SEARCH_MOVIES } from '../../API';
import styles from './Search.module.css';

export const Search = () => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(API_SEARCH_MOVIES(input, 1));
      const data = await response.json();

      console.log(data);
    };

    input && fetchMovies();
  }, [input]);

  return (
    <div className={styles.container}>
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        type="text"
        placeholder="Search for a movie"
        className={styles.input}
      />
    </div>
  );
};
