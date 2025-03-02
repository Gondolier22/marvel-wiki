import { render, screen } from '@testing-library/react';
import { Header } from '../header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header Component', () => {
  test('renders logo link', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const logoLink = screen.getByRole('link', { name: /go to character list/i });
    expect(logoLink).toBeTruthy();
  });

  test('renders favs link with counter', async () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const favsLink = screen.getByRole('link', { name: /go to favs page/i });
    expect(favsLink).toBeTruthy();
    const favCount = screen.getByText('0');
    expect(favCount).toBeTruthy();
  });
});
