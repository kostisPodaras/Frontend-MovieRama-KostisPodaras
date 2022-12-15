import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import * as hooks from 'hooks/useGenres';
import App from './App';

describe('App component', () => {
  test('should render the component', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
