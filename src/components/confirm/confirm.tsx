import Button from '../button/button';

import './confirm.scss';

export interface ConfirmProps {
  title?: string;
  description?: string;
  onOk?: () => void;
  onCancel?: () => void;
  toggle?: () => void;
}

function Confirm({ title, description, onOk, onCancel, toggle }: ConfirmProps) {
  const handleOk = () => {
    onOk && onOk();
    toggle && toggle();
  };

  const handleCancel = () => {
    onCancel && onCancel();
    toggle && toggle();
  };

  return (
    <section className="confirm">
      <h2>{title}</h2>
      <p>{description}</p>
      <footer>
        <Button autoFocus onClick={handleOk}>
          Yes
        </Button>
        <Button onClick={handleCancel}>No</Button>
      </footer>
    </section>
  );
}

export default Confirm;
