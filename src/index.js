import React from 'react';
import { render } from 'react-dom';
import store from './store/index';
import { Provider } from 'react-redux';
import AppContainer from './components/AppContainer';

render(
  <Provider store={ store }> 
    <AppContainer/>
  </Provider>,
  document.getElementById('app')
);