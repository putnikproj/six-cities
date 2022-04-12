import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import { offers } from './mocks/offers';

import App from './components/app/app';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App offers={offers} />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
