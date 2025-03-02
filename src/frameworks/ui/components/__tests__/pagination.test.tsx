import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../pagination';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const mockPreviousPage = jest.fn();
  const mockNextPage = jest.fn();

  const setup = (isPreviousPageDisabled: boolean, isNextPageDisabled: boolean) => {
    render(
      <Pagination
        previousPage={mockPreviousPage}
        nextPage={mockNextPage}
        isPreviousPageDisabled={isPreviousPageDisabled}
        isNextPageDisabled={isNextPageDisabled}
      />
    );
  };

  it('should render Previous and Next buttons', () => {
    setup(false, false);
    expect(screen.getByText('Previous')).toBeTruthy();
    expect(screen.getByText('Next')).toBeTruthy();
  });

  it('should call previousPage when Previous button is clicked', () => {
    setup(false, false);
    fireEvent.click(screen.getByText('Previous'));
    expect(mockPreviousPage).toHaveBeenCalled();
  });

  it('should call nextPage when Next button is clicked', () => {
    setup(false, false);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNextPage).toHaveBeenCalled();
  });

  it('should disable Previous button when isPreviousPageDisabled is true', () => {
    setup(true, false);
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('should disable Next button when isNextPageDisabled is true', () => {
    setup(false, true);
    expect(screen.getByText('Next')).toBeDisabled();
  });
});
