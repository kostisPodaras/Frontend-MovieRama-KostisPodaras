import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import * as hooks from 'hooks/useMovieDetails';

import { MovieDetails } from '../MovieDetails';

describe('MovieList component', () => {
  const mockDetails = {
    movieDetails: {
      poster_path: '/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg',
      title: 'Black Adam',
      release_date: '2022-10-19',
      genres: [{ id: 28, name: 'Action' }],
      genre_ids: [1, 2, 3],
      vote_average: 7.309,
      overview:
        'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
      id: 436270,
      videos: {
        results: [
          {
            name: 'Official Trailer',
            key: 'JaV7mmc9HGw',
            site: 'YouTube',
            size: 1080,
            type: 'Trailer',
            official: true,
            id: 123,
          },
          {
            name: 'Official Trailer',
            site: 'YouTube',
            size: 1080,
            type: 'Trailer',
            official: true,
            id: 123,
            key: '123',
          },
        ],
      },
      similar: {
        results: [
          {
            id: 913290,
            original_title: 'Barbarian',
            overview:
              'In town for a job interview, a young woman arrives at her Airbnb late at night only to find that it has been mistakenly double-booked and a strange man is already staying there. Against her better judgement, she decides to stay the night anyway.',
            poster_path: '/idT5mnqPcJgSkvpDX7pJffBzdVH.jpg',
            vote_average: 6.94,
            vote_count: 883,
          },
          {
            id: 912649,
            original_language: 'en',
            original_title: 'Venom 3',
            overview:
              'The third entry in the Venom trilogy confirmed to be in development by Amy Pascal.',
            poster_path: '/s5R8Jax1IjxF4a3IygLCW1Zib6GB.jpg',
            vote_average: 0,
            vote_count: 0,
          },
        ],
      },
      reviews: {
        results: [
          {
            author_details: {
              name: 'MSB',
              username: 'msbreviews',
              avatar_path:
                '/https://www.gravatar.com/avatar/992eef352126a53d7e141bf9e8707576.jpg',
              rating: 5,
            },
            content:
              'FULL SPOILER-FREE REVIEW @ https://www.msbreviews.com/movie-reviews/black-adam-spoiler-free-review\r\n\r\n"Black Adam is far from impressive, being somewhat disappointing due to its formulaic, predictable screenplay when something different was anticipated.\r\n\r\nLorne Balfe\'s epic score and a magnificent cast - Dwayne Johnson, Aldis Hodge, and most remarkably Pierce Brosnan are phenomenal - try to elevate the decent action and visuals, but the moderate entertainment levels don\'t make up for the dated narrative structure.\r\n\r\nTiresomely heavy exposition, story with little to no creativity, and inconsistent humor make it impossible for the DCEU to take "the next step" in a truly impactful manner."\r\n\r\nRating: C+',
            id: '63501e9ed363e5007a664110',
          },
          {
            author_details: {
              name: 'Faraz Khan',
              username: 'farazmushtaqk',
              avatar_path: '/3H7iyvGtmsHQFcKIoaC1PkjiPij.jpg',
              rating: 7,
            },
            content: "Well it wasn't disappointing...",
            id: '63540bcb2441820082f30903',
          },
        ],
      },
    },
    isLoading: false,
    isError: false,
  };

  test('Should render the component', () => {
    jest.spyOn(hooks, 'useMovieDetails').mockImplementation(() => {
      return mockDetails;
    });

    render(<MovieDetails movieId={123} />);
    const reviewElement = screen.getAllByRole('article');
    expect(reviewElement).toHaveLength(2);
  });

  test('Should show loading spinner when component is loading', () => {
    jest.spyOn(hooks, 'useMovieDetails').mockImplementation(() => {
      return {
        ...mockDetails,
        isLoading: true,
        isError: false,
      };
    });

    render(<MovieDetails movieId={123} />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('Should show error message when isError is true', () => {
    jest.spyOn(hooks, 'useMovieDetails').mockImplementation(() => {
      return {
        ...mockDetails,
        isLoading: false,
        isError: true,
      };
    });

    render(<MovieDetails movieId={123} />);
    const errorElement = screen.getByText('Something went wrong');
    expect(errorElement).toBeInTheDocument();
  });

  test('Should not render component if no movide details', () => {
    jest.spyOn(hooks, 'useMovieDetails').mockImplementation(() => {
      return {
        isLoading: false,
        isError: true,
      };
    });

    const { container } = render(<MovieDetails movieId={123} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('matches snapshot', () => {
    jest.spyOn(hooks, 'useMovieDetails').mockImplementation(() => {
      return mockDetails;
    });
    const snapshot = renderer.create(<MovieDetails movieId={123} />);
    expect(snapshot).toMatchSnapshot();
  });
});
