import { Similar } from 'types';
import { RatingStar } from 'components';

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
      <h4 className={styles.title}>Similar movies</h4>

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

              <div className={styles.rating}>
                <RatingStar rating={movie.vote_average} />
                <span>{movie.vote_count} votes</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
