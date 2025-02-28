import { render, fireEvent } from '@testing-library/react';
import { Searcher } from '../searcher';

describe('Searcher', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    value: '',
    totalResults: 0,
    onChange: mockOnChange,
  };

  it('should render without crashing', () => {
    render(<Searcher {...defaultProps} />);
  });

  it('should display the correct placeholder text', () => {
    const { getByPlaceholderText } = render(<Searcher {...defaultProps} />);
    const inputElement = getByPlaceholderText('Search a character...');
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const { getByPlaceholderText } = render(<Searcher {...defaultProps} />);
    const inputElement = getByPlaceholderText('Search a character...');
    fireEvent.change(inputElement, { target: { value: 'Spider-Man' } });
    expect(mockOnChange).toHaveBeenCalledWith('Spider-Man');
  });

  it('should display the correct number of results', () => {
    const { getByText } = render(<Searcher {...defaultProps} totalResults={5} />);
    const resultsElement = getByText('5 results');
    expect(resultsElement).toBeInTheDocument();
  });
});
