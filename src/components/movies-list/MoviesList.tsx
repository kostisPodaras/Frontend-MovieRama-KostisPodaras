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

  return (
    <div className={styles.container}>
      {movies.map((movie, i) => {
        // If the element is the last one, we add a ref to it in order to observe it
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
