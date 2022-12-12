import { useMovieDetails } from '../../hooks';
import { VideoPlayer, Reviews } from './components';
import { Spinner } from '..';

interface MovieDetailsProps {
  movieId: string;
}

export const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { movieDetails, isLoading, isError } = useMovieDetails(movieId);

  if (!movieDetails) {
    return null;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  const { videos, reviews } = movieDetails;

  // Dont really like finding the trailer via name, but I could not find any other property that indicates the trailer
  const trailer = videos.results.find(
    (video) => video.name === 'Official Trailer',
  );

  console.log('reviews', reviews);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <VideoPlayer id={trailer?.key} />
          <Reviews reviews={reviews.results} />
        </div>
      )}
    </>
  );
};
