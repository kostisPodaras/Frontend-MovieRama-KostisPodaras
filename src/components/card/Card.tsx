import React, { useState } from 'react';

import { Movie } from 'types';

import styles from './Card.module.css';
import { Chips, Modal, MovieDetails } from '..';

interface CardProps {
  movie: Movie;
}

export const Card = React.forwardRef<HTMLInputElement, CardProps>(
  ({ movie }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div onClick={() => setIsOpen(true)} ref={ref || null}>
          <div
            style={{
              backgroundImage: movie.poster_path
                ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                : 'url(https://nogalss.org/admin/assets/images/no-image2.png)',
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
          <MovieDetails movieId={movie.id} />
        </Modal>
      </>
    );
  },
);
