import { useEffect, useState } from 'react';

import { Review, Movie, Similar } from 'types';

import { getMovieDetails } from '../services';

interface Video {
  id: number;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

interface Response extends Movie {
  videos: {
    results: Video[];
  };
  reviews: {
    results: Review[];
  };
  similar: {
    results: Similar[];
  };
}

export const useMovieDetails = (movieId: number) => {
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
