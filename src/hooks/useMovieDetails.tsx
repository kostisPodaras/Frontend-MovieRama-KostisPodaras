import { useEffect, useState } from 'react';
import { getMovieDetails } from '../services';
import { MovieProps } from '../components/movies-list/MoviesList';

interface Response extends MovieProps {
  // Add reviews, videos, similar
  videos: any[];
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
