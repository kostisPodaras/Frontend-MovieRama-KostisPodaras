import { useMovieDetails } from 'hooks';
import { Spinner } from 'components';

import { VideoPlayer, Reviews, SimilarMovies } from './components';

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

  // Dont really like finding the trailer via name, but I could not find any other unique id that indicates the correct trailer
  const trailer = videos.results
    .filter(({ official }) => official)
    .find((result) => result.name.includes('Official'));

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <VideoPlayer id={trailer?.key || videos.results?.[0]?.key} />
          <Reviews reviews={reviews.results} maxReviewsShown={2} />
          <SimilarMovies
            movies={movieDetails.similar.results}
            maxMoviesShown={6}
          />
        </div>
      )}
    </>
  );
};
