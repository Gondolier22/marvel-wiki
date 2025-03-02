import { FC } from 'react';

type PaginationProps = {
  previousPage: () => void;
  nextPage: () => void;
  isNextPageDisabled: boolean;
  isPreviousPageDisabled: boolean;
};

export const Pagination: FC<PaginationProps> = ({
  nextPage,
  previousPage,
  isNextPageDisabled,
  isPreviousPageDisabled,
}) => (
  <div className="c-pagination">
    <button
      disabled={isPreviousPageDisabled}
      className="c-pagination__button"
      onClick={previousPage}
    >
      Previous
    </button>
    <button disabled={isNextPageDisabled} className="c-pagination__button" onClick={nextPage}>
      Next
    </button>
  </div>
);
