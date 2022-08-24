import clsx from 'clsx';

import Button from '../button/button';

import './modal.scss';

export interface ModalProps {
  isOpened: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

function Modal({ isOpened, toggle, children }: ModalProps) {
  return (
    <div className={clsx('modal', { opened: isOpened })}>
      <div className="modal-content">
        <Button className="close" onClick={toggle}>
          X
        </Button>

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
