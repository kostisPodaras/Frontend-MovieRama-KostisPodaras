import { Similar } from 'types';
import styles from './SimilarMovies.module.css';

interface SimilarMoviesProps {
  movies: Similar[];
  maxMoviesShown: number;
}

export const SimilarMovies = ({
  movies,
  maxMoviesShown,
}: SimilarMoviesProps) => {
  const similarMovies = movies.slice(0, maxMoviesShown);

  console.log('similarMovies', similarMovies);

  return (
    <div>
      {similarMovies.map((movie) => {
        return (
          <div key={movie.id} className={styles.container}>
            <div className={styles.leftSection}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className={styles.image}
              />
              <p>{movie.original_title}</p>
            </div>

            <div className={styles.rightSection}>
              <p>{movie.overview}</p>
              <p>
                Average of {movie.vote_average.toFixed(1)} (
                <span>{movie.vote_count}</span>
                votes)
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
