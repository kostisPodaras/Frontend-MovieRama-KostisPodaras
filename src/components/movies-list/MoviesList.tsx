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
}

export const MoviesList = ({ movies }: MoviesListProps) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
