import './spinner.scss';

interface SpinnerProps {
  visible: boolean;
}

function Spinner({ visible }: SpinnerProps) {
  return visible ? (
    <div className="spinner">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  ) : null;
}

export default Spinner;
