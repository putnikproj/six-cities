import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { offers } from './mocks/offers';

import App from './components/app/app';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
