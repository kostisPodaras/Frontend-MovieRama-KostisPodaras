import React from 'react';
import { MovieProps } from '../movies-list/MoviesList';
import styles from './Card.module.css';

interface CardProps {
  movie: MovieProps;
}

export const Card = React.forwardRef<HTMLInputElement, CardProps>(
  ({ movie }, ref) => {
    const content = (
      <>
        <p className={styles.title}>{movie.title}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie"
          className={styles.posterImage}
        />
      </>
    );

    return ref ? <div ref={ref}>{content}</div> : <div>{content}</div>;
  },
);
