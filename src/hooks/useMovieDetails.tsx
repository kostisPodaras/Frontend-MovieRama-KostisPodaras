import { useEffect, useState } from 'react';
import { getMovieDetails } from '../models';

export const useMovieDetails = (movieId: string) => {
  const [movieDetails, setMovieDetails] = useState<any>();

  useEffect(() => {
    getMovieDetails(movieId).then((data) => {
      console.log('movieDetails', data);

      setMovieDetails(data);
    });
  }, []);

  return {
    movieDetails,
  };
};
