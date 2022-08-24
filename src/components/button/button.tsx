import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

import './button.scss';

function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx('button', className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
