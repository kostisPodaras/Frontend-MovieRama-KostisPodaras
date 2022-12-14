import { memo, useMemo, useState } from 'react';

import { Movie } from 'types';
import { Card, Chips } from 'components';
import { useGenres } from 'hooks';
import {
  arrayOfObjectsToDictionary,
  matchGenresIdsWithGenres,
  groupByGenres,
} from 'utils';

import styles from './MoviesList.module.css';

interface MoviesListProps {
  movies: Movie[];
  lastMovieRef: any;
}

const List = ({ movies, lastMovieRef }: MoviesListProps) => {
  const { genres } = useGenres();

  const [filter, setFilter] = useState('all');

  const hasGenres = genres.length > 0;

  // Transforming array of objects to dictionary so we dont have to iterate for each movie multiple times to find the correct genre based on id. It gets pretty heavy performance wise
  const genresDictionary = useMemo(
    () => arrayOfObjectsToDictionary(genres, 'id'),
    [hasGenres],
  );

  const moviesWithGenres = matchGenresIdsWithGenres(movies, genresDictionary);

  // Group movies based on genre. That way filtering will be instant, since we just grab the property of the filter with the already pre-filtered movies, instead of filtering again and again on filter change.
  // We also keep the filtering after we search, so we search only for the specific filter
  const moviesByGenre = groupByGenres(moviesWithGenres);

  return (
    <>
      <div>
        <Chips
          chips={[{ id: 'all', name: 'all' }, ...genres]}
          handleClick={setFilter}
          active={filter}
          stylesOverride={styles.chipsOverride}
        />
      </div>

      {moviesByGenre?.[filter] ? (
        <div className={styles.container}>
          {moviesByGenre[filter].map((movie, i) => {
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
        <h4>No {filter} movies found</h4>
      )}
    </>
  );
};

export const MoviesList = memo(List);
