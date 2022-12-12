import { useMovieDetails } from '../../hooks';
import { Spinner } from '..';

interface MovieDetailsProps {
  movieId: string;
}

export const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { movieDetails, isLoading, isError } = useMovieDetails(movieId);

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <p>Details</p>
        </div>
      )}
    </>
  );
};
