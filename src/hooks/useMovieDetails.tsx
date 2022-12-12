import { useEffect, useState } from 'react';
import { getMovieDetails } from '../services';
import { MovieProps } from '../components/movies-list/MoviesList';

interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  type: string;
}
interface Response extends MovieProps {
  // Add reviews, videos, similar
  videos: {
    results: Video[];
  };
}

export const useMovieDetails = (movieId: string) => {
  const [movieDetails, setMovieDetails] = useState<Response>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovieDetails(movieId)
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return {
    movieDetails,
    isLoading,
    isError,
  };
};
