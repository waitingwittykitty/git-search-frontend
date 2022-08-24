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
      <button autoFocus onClick={handleOk}>
        Yes
      </button>
      <button onClick={handleCancel}>No</button>
    </section>
  );
}

export default Confirm;
