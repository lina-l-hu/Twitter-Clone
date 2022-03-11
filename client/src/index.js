import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CurrentUserProvider } from './components/CurrentUserContext';
import { HomefeedProvider } from './components/HomefeedContext';


ReactDOM.render(
    <CurrentUserProvider>
      <HomefeedProvider>
        <App />
      </HomefeedProvider>
    </CurrentUserProvider>,
  document.getElementById('root')
);

