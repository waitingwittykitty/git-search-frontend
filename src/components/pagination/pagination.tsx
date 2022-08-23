import React, { BaseHTMLAttributes, ButtonHTMLAttributes } from 'react';

const DefaultButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => (
  <button {...props}>{props.children}</button>
);

const DefaultSpan: React.FC<BaseHTMLAttributes<HTMLSpanElement>> = props => (
  <span {...props}>{props.children}</span>
);

interface PaginationProps {
  total: number;
  page: number;
  buttonAs?: React.ComponentType<ButtonHTMLAttributes<HTMLButtonElement>>;
  spanAs?: React.ComponentType<BaseHTMLAttributes<HTMLSpanElement>>;
  onChangePage?: (page: number) => void;
  prevText?: string;
  nextText?: string;
}

function Pagination({
  total,
  page,
  buttonAs: Button = DefaultButton,
  spanAs: Span = DefaultSpan,
  onChangePage,
  prevText = 'Prev',
  nextText = 'Next',
}: PaginationProps) {
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= total;

  const handleChangePage = (page: number) => () => {
    onChangePage && onChangePage(page);
  };

  return (
    <div className="pagination">
      <div className="pagination-pages">
        <Button onClick={handleChangePage(page - 1)} disabled={isPrevDisabled}>
          {prevText}
        </Button>

        {page > 1 && <Button onClick={handleChangePage(1)}>1</Button>}

        {page > 3 && <Span>...</Span>}

        {page > 2 && <Button onClick={handleChangePage(page - 1)}>{page - 1}</Button>}

        <Button className="active">{page}</Button>

        {page < total - 1 && (
          <Button onClick={handleChangePage(page + 1)}>{page + 1}</Button>
        )}

        {page < total - 2 && <Span>...</Span>}

        {page < total && <Button onClick={handleChangePage(total)}>{total}</Button>}

        <Button onClick={handleChangePage(page + 1)} disabled={isNextDisabled}>
          {nextText}
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
