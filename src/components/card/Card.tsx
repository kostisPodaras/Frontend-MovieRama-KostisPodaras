import { MovieProps } from '../movies-list/MoviesList';
import styles from './Card.module.css';

interface CardProps {
  movie: MovieProps;
}

export const Card = ({ movie }: CardProps) => {
  console.log(movie);
  return (
    <div>
      <p className={styles.title}>{movie.title}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="movie"
        className={styles.posterImage}
      />
    </div>
  );
};
