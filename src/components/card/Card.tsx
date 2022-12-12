import React, { useState } from 'react';
import { MovieProps } from '../movies-list/MoviesList';
import styles from './Card.module.css';
import { Chips, Modal, MovieDetails } from '..';

interface CardProps {
  movie: MovieProps;
}

export const Card = React.forwardRef<HTMLInputElement, CardProps>(
  ({ movie }, ref) => {
    console.log(movie);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div onClick={() => setIsOpen(true)} ref={ref || null}>
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
            }}
            className={styles.container}>
            <div className={styles.genresWrapper}>
              <Chips chips={movie.genres} />
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
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <MovieDetails />
        </Modal>
      </>
    );
  },
);
