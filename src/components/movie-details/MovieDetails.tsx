import { useMovieDetails } from '../../hooks';
import { VideoPlayer } from './components';
import { Spinner } from '..';

interface MovieDetailsProps {
  movieId: string;
}

export const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { movieDetails, isLoading, isError } = useMovieDetails(movieId);

  if (isError) {
    return <p>Something went wrong</p>;
  }

  if (!movieDetails) {
    return null;
  }

  const { videos } = movieDetails;

  // Dont really like finding the trailer via name, but I could not find any other property that indicates the trailer
  const trailer = videos.results.find(
    (video) => video.name === 'Official Trailer',
  );

  console.log('trailer', trailer);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <VideoPlayer id={trailer?.key} />
          <p>Details</p>
        </div>
      )}
    </>
  );
};
