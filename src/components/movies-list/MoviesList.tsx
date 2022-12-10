import { useCallback, useRef } from 'react';
import { Card } from '../card/Card';
import styles from './MoviesList.module.css';
export interface MovieProps {
  poster_path: string;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: string;
  overview: string;
  id: string;
}

interface MoviesListProps {
  movies: MovieProps[];
  lastMovieRef: any;
}

export const MoviesList = ({ movies, lastMovieRef }: MoviesListProps) => {
  if (movies.length === 0) {
    return null;
  }

  // If the element is the last one, we add a ref to it, so we can observe it
  const content = movies.map((movie, i) => {
    if (movies.length === i + 1) {
      console.log('Last element');
      return <Card ref={lastMovieRef} key={movie.id} movie={movie} />;
    }

    return <Card key={movie.id} movie={movie} />;
  });

  return <div className={styles.container}>{content}</div>;
};
