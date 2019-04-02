import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/index';
import './styles/rgapp.scss';
import AppContainer from './components/AppContainer';

const store = configureStore({});

render(
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <AppContainer/>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
);
