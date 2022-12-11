import React from 'react';
import { MovieProps } from '../movies-list/MoviesList';
import styles from './Card.module.css';

interface CardProps {
  movie: MovieProps;
}

export const Card = React.forwardRef<HTMLInputElement, CardProps>(
  ({ movie }, ref) => {
    console.log(movie);

    return (
      <div ref={ref || null}>
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
          }}
          className={styles.container}>
          <div className={styles.genresWrapper}>
            {movie.genres?.map((genre) => (
              <p>{genre}</p>
            ))}
          </div>

          <div className={styles.overviewOverlay}>
            <p>{movie.overview}</p>
          </div>
        </div>

        <p className={styles.text}>
          {movie.title} | {movie.release_date?.split('-')[0] || 'Uknown'}
        </p>

        <p className={styles.text}>{movie.vote_average}</p>
      </div>
    );
  },
);
