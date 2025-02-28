import { render } from '@testing-library/react';
import { Loader } from '../loader';

describe('Loader', () => {
  it('should render without crashing', () => {
    render(<Loader />);
  });

  it('should have the correct role attribute', () => {
    const { getByRole } = render(<Loader />);
    const loaderElement = getByRole('status');
    expect(loaderElement).toBeInTheDocument();
  });

  it('should have the correct class name', () => {
    const { container } = render(<Loader />);
    const loaderElement = container.firstChild;
    expect(loaderElement).toHaveClass('c-loader');
  });
});
