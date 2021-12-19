import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ChatApp from './ChatApp';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChatApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
