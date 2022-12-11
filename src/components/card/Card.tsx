import React from 'react';
import { MovieProps } from '../movies-list/MoviesList';
import styles from './Card.module.css';

interface CardProps {
  movie: MovieProps;
}

export const Card = React.forwardRef<HTMLInputElement, CardProps>(
  ({ movie }, ref) => {
    return (
      <div ref={ref || null}>
        <div className={styles.posterWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.posterImage}
          />

          <div className={styles.overviewWrapper} style={{}}>
            <p>{movie.overview}</p>
          </div>
        </div>

        <p className={styles.text}>
          {movie.title} | {movie.release_date?.split('-')[0]}
        </p>
        <p className={styles.text}>{movie.vote_average}</p>
      </div>
    );
  },
);
