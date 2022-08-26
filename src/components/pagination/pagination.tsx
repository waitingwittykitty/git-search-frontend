import clsx from 'clsx';
import React, { ButtonHTMLAttributes, useMemo } from 'react';

import './pagination.scss';

const DefaultButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => (
  <button {...props}>{props.children}</button>
);

interface PaginationProps {
  total: number;
  page: number;
  buttonAs?: React.ComponentType<ButtonHTMLAttributes<HTMLButtonElement>>;
  onChangePage?: (page: number) => void;
  numeralButtonCount?: number;
  firstText?: string;
  lastText?: string;
  prevText?: string;
  nextText?: string;
}

function Pagination({
  total,
  page,
  buttonAs: Button = DefaultButton,
  onChangePage,
  numeralButtonCount = 5,
  firstText = '<<',
  lastText = '>>',
  prevText = '<',
  nextText = '>',
}: PaginationProps) {
  const isFirstDisabled = page <= 1;
  const isLastDisabled = page >= total;
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= total;
  const buttonNumbers = useMemo(() => {
    let offset = Math.floor(numeralButtonCount / 2);
    if (offset > page - 1) offset = page - 1;
    if (offset > total - page) offset = numeralButtonCount + page - total - 1;

    return Array(numeralButtonCount)
      .fill(0)
      .map((_, index) => page + Number(index) - offset);
  }, [numeralButtonCount, page, total]);

  const handleChangePage = (pageToChange: number) => () => {
    if (page !== pageToChange) {
      onChangePage && onChangePage(pageToChange);
    }
  };

  const shouldShowButtonNumber = (buttonNumber: number) =>
    buttonNumber >= 1 && buttonNumber <= total;

  return (
    <div className="pagination">
      <div className="pagination-pages">
        <Button onClick={handleChangePage(1)} disabled={isFirstDisabled}>
          {firstText}
        </Button>

        <Button onClick={handleChangePage(page - 1)} disabled={isPrevDisabled}>
          {prevText}
        </Button>

        {buttonNumbers.map(
          buttonNumber =>
            shouldShowButtonNumber(buttonNumber) && (
              <Button
                key={buttonNumber}
                className={clsx({ active: buttonNumber === page })}
                onClick={handleChangePage(buttonNumber)}
              >
                {buttonNumber}
              </Button>
            )
        )}

        <Button onClick={handleChangePage(page + 1)} disabled={isNextDisabled}>
          {nextText}
        </Button>

        <Button onClick={handleChangePage(total)} disabled={isLastDisabled}>
          {lastText}
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
