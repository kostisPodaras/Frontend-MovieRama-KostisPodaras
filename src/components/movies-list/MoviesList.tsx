import { memo, useMemo } from 'react';

import { Movie } from 'types';
import { Card } from 'components';
import { useGenres } from 'hooks';
import { arrayOfObjectsToDictionary, matchGenresIdsWithGenres } from 'utils';

import styles from './MoviesList.module.css';

interface MoviesListProps {
  movies: Movie[];
  lastMovieRef: any;
}

const List = ({ movies, lastMovieRef }: MoviesListProps) => {
  const { genres } = useGenres();
  const hasGenres = genres.length > 0;

  // Transforming array of objects to dictionary so we dont have to iterate for each movie multiple times to find the correct genre based on id. It gets pretty heavy performance wise
  const genresDictionary = useMemo(
    () => arrayOfObjectsToDictionary(genres, 'id'),
    [hasGenres],
  );

  const moviesWithGenres = matchGenresIdsWithGenres(movies, genresDictionary);

  return (
    <>
      {movies.length > 0 ? (
        <div className={styles.container}>
          {moviesWithGenres.map((movie, i) => {
            // If the element is the last one, we add a ref to it in order to observe it and trigger a new request when its getting into the viewport
            const isLastElement = movies.length === i + 1;

            return (
              <Card
                ref={isLastElement ? lastMovieRef : null}
                key={movie.id}
                movie={movie}
              />
            );
          })}
        </div>
      ) : (
        <h2>No results found</h2>
      )}
    </>
  );
};

export const MoviesList = memo(List);
