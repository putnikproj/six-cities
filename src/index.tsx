import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Settings } from './const';

ReactDOM.render(
  <React.StrictMode>
    <App placesAmount={Settings.PLACES_AMOUNT} />
  </React.StrictMode>,
  document.getElementById('root'),
);
