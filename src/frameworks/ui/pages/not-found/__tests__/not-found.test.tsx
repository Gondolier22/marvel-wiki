import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound Page', () => {
  test('renders the alert message', () => {
    render(<NotFound />);
    const alertMessage = screen.getByText(/404 - The content can not be found/i);
    expect(alertMessage).toBeTruthy();
  });
});
