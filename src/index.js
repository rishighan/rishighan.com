import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/index';
import './styles/rgapp.scss';
import AppContainer from './components/AppContainer';

render(
  <Provider store={ store }>
    <Router>
      <AppContainer/>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
