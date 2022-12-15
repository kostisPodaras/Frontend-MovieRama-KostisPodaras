import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import * as hooks from 'hooks/useGenres';

import { MoviesList } from '..';

describe('MovieList component', () => {
  const mockProps = [
    {
      genre_ids: [28, 14, 878],
      id: 436270,
      overview:
        'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
      poster_path: '/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg',
      release_date: '2022-10-19',
      title: 'Black Adam',
      vote_average: 7.3,
    },
    {
      genre_ids: [28, 18, 36],
      id: 724495,
      overview:
        'The story of the Agojie, the all-female unit of warriors who protected the African Kingdom of Dahomey in the 1800s with skills and a fierceness unlike anything the world has ever seen, and General Nanisca as she trains the next generation of recruits and readies them for battle against an enemy determined to destroy their way of life.',
      poster_path: '/lQMJHnHxUyj8kJlC2YOKNuzuwMP.jpg',
      release_date: '2022-09-15',
      title: 'The Woman King',
      vote_average: 7.9,
    },
  ];

  test('Should render the component', () => {
    jest.spyOn(hooks, 'useGenres').mockImplementation(() => {
      return {
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
          { id: 16, name: 'Animation' },
        ],
        genresIsLoading: false,
        genresIsError: false,
      };
    });

    render(<MoviesList movies={mockProps} lastMovieRef={null} />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('Should render all the chips plus the "all" chip', () => {
    jest.spyOn(hooks, 'useGenres').mockImplementation(() => {
      return {
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
          { id: 16, name: 'Animation' },
        ],
        genresIsLoading: false,
        genresIsError: false,
      };
    });

    render(<MoviesList movies={[]} lastMovieRef={null} />);
    const chipElement = screen.getAllByTestId('chip');
    expect(chipElement).toHaveLength(4);
  });

  test('matches snapshot', () => {
    jest.spyOn(hooks, 'useGenres').mockImplementation(() => {
      return {
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
          { id: 16, name: 'Animation' },
        ],
        genresIsLoading: false,
        genresIsError: false,
      };
    });

    const snapshot = renderer.create(
      <MoviesList movies={mockProps} lastMovieRef={null} />,
    );
    expect(snapshot).toMatchSnapshot();
  });
});
