import styles from './Search.module.css';

export const Search = () => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search for a movie"
        className={styles.input}
      />
    </div>
  );
};
