import styles from './Search.module.css';

export const Search = ({ query, setQuery }) => {
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
