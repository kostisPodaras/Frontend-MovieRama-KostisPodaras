import { useEffect, useState } from 'react';

import { Review, Movie } from 'types';

import { getMovieDetails } from '../services';

interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
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
