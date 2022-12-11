import styles from './Search.module.css';

export const Search = ({ query, setQuery }) => {
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const response = await fetch(API_SEARCH_MOVIES(input, 1));
  //     const data = await response.json();

  //     console.log(data);
  //   };

  //   input && fetchMovies();
  // }, [input]);

  return (
    <div className={styles.container}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        type="text"
        placeholder="Search for a movie"
        className={styles.input}
      />
    </div>
  );
};
