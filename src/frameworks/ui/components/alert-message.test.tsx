import { render, screen } from '@testing-library/react';
import { AlertMessage } from './alert-message';

describe('AlertMessage', () => {
  it('renders the message', () => {
    render(<AlertMessage message="Test message" type="success" />);
    expect(screen.getByRole('alert')?.textContent).toBe('Test message');
  });
});
