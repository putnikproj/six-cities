import { CSSProperties } from 'react';
import classNames from 'classnames';

import './spinner.css';

type SpinnerProps = {
  centerX?: boolean;
  centerY?: boolean;
  style?: CSSProperties;
};

function Spinner({ centerX = false, centerY = false, style = {} }: SpinnerProps) {
  return (
    <div
      className={classNames('spinner-container', {
        'spinner-container--center-x': centerX,
        'spinner-container--center-y': centerY,
      })}
      style={style}
    >
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
