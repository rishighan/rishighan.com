import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import './styles/rgapp.scss';
import AppContainer from './components/AppContainer';

render(
    <Provider store={ store }>
      <BrowserRouter>
        <AppContainer/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
);
