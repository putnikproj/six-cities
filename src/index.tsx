import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import { Settings } from './const';
import { offers } from './mocks/offers';

ReactDOM.render(
  <React.StrictMode>
    <App offers={offers} placesAmount={Settings.PLACES_AMOUNT} />
  </React.StrictMode>,
  document.getElementById('root'),
);
