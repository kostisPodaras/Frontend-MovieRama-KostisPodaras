import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Card } from '../Card';

describe('Card component', () => {
  const mockProps = {
    id: 934641,
    overview:
      'A stockbroker in a small southern town gets embroiled in an insurance scam with a next-door neighbor that leads to multiple murders when a host of other people want in on the plot. Sheriff Thurmond Fowler, the by-the-book town sheriff for over four decades, works earnestly to try and unravel the town’s mystery and winds up getting more than he bargained for.',
    poster_path: '/pUPwTbnAqfm95BZjNBnMMf39ChT.jpg',
    release_date: '2022-11-04',
    title: 'The Minute You Wake Up Dead',
    vote_average: 5.5,
    genres: [
      { name: 'Thriller', id: 53 },
      { name: 'Crime', id: 80 },
    ],
    genre_ids: [53, 80],
  };

  test('should render Card component', () => {
    render(<Card movie={mockProps} />);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveTextContent(mockProps.overview);
    expect(cardElement).toHaveTextContent(mockProps.title);
  });

  test('should render Card component without background-image', () => {
    const props = { ...mockProps, poster_path: '' };
    const noImageUrl =
      'url(https://nogalss.org/admin/assets/images/no-image2.png)';

    render(<Card movie={props} />);
    const cardElement = screen.getByTestId('card-background');
    expect(cardElement).toHaveStyle(`background-image: ${noImageUrl}`);
  });

  test('matches snapshot', () => {
    const snapshot = renderer.create(<Card movie={mockProps} />);
    expect(snapshot).toMatchSnapshot();
  });
});
