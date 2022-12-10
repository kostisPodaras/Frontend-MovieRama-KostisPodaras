import React from 'react';
import { MovieProps } from '../movies-list/MoviesList';
import styles from './Card.module.css';

interface CardProps {
  movie: MovieProps;
}

export const Card = React.forwardRef<HTMLInputElement, CardProps>(
  ({ movie }, ref) => {
    console.log('movie', movie);
    return (
      <div ref={ref || null}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie"
          className={styles.posterImage}
        />
        <p className={styles.title}>{movie.title}</p>
      </div>
    );
  },
);
