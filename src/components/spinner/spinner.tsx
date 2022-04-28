import classNames from 'classnames';

import './spinner.css';

type SpinnerProps = {
  centerX?: boolean;
  centerY?: boolean;
};

function Spinner({ centerX = false, centerY = false }: SpinnerProps) {
  return (
    <div
      className={classNames('spinner-container', {
        'spinner-container--center-x': centerX,
        'spinner-container--center-y': centerY,
      })}
    >
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
