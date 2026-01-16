import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('./App', () => {
  return () => <div>App</div>;
});

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <div>App</div>
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/App/i);
  expect(linkElement).toBeInTheDocument();
});