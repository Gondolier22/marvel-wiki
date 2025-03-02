import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainLayout } from '../main-layout';

jest.mock('../components/header', () => ({
  Header: () => <div>Mock Header</div>,
}));

jest.mock('../../../components/alert-message', () => ({
  AlertMessage: ({ message }: { message: string }) => <div>{message}</div>,
}));

describe('MainLayout', () => {
  it('renders the header', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );
    const header = screen.getByText(/Mock Header/i);
    expect(header).toBeTruthy();
  });
});
