import clsx from 'clsx';
import type { TableHTMLAttributes } from 'react';

import './table.scss';

export default function Table({
  children,
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-responsive">
      <table className={clsx('table', className)} {...props}>
        {children}
      </table>
    </div>
  );
}
