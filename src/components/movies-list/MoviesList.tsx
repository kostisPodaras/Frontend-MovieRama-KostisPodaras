import { useMemo } from 'react';

import { Card } from '../card/Card';
import { useGenres } from '../../hooks';
import styles from './MoviesList.module.css';
import { arrayOfObjectsToDictionary } from '../../utils';
export interface MovieProps {
  poster_path: string;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: string;
  overview: string;
  id: string;
  genres?: string[];
}

interface MoviesListProps {
  movies: MovieProps[];
  lastMovieRef: any;
}

export const MoviesList = ({ movies, lastMovieRef }: MoviesListProps) => {
  const { genres } = useGenres();
  const hasGenres = genres.length > 0;

  console.log('RENDER');

  // Transforming array of objects to dictionary so we dont have to iterate for each movie multiple times to find the correct genre based on id. It gets pretty heavy performance wise
  const genresDictionary = useMemo(
    () => arrayOfObjectsToDictionary(genres, 'id'),
    [hasGenres],
  );

  if (movies.length === 0 || !hasGenres) {
    return null;
  }

  const moviesWithGenres = movies.map((movie) => {
    const movieGenres = movie.genre_ids.map((id) => genresDictionary[id].name);

    return {
      ...movie,
      genres: movieGenres,
    };
  });

  return (
    <div className={styles.container}>
      {moviesWithGenres.map((movie, i) => {
        // If the element is the last one, we add a ref to it in order to observe it and trigger a new request when its getting into the viewport
        const isLastElement = movies.length === i + 1;

        return (
          <Card
            ref={isLastElement ? lastMovieRef : null}
            key={movie.id}
            movie={movie}
          />
        );
      })}
    </div>
  );
};
