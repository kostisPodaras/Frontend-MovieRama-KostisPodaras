import { useEffect } from 'react';
import { useMovieDetails } from '../../hooks';

interface MovieDetailsProps {
  movieId: string;
}

export const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { movieDetails } = useMovieDetails(movieId);

  return (
    <div>
      <p>Details</p>
    </div>
  );
};
