import clsx from 'clsx';

import './modal.scss';

export interface ModalProps {
  isOpened: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

function Modal({ isOpened, toggle, children }: ModalProps) {
  return (
    <div className={clsx('modal-container', { opened: isOpened })}>
      <button onClick={toggle}>X</button>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
