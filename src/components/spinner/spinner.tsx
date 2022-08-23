interface SpinnerProps {
  visible: boolean;
}

function Spinner({ visible }: SpinnerProps) {
  return visible ? <div>loading...</div> : null;
}

export default Spinner;
