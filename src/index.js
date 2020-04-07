import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import './styles/rgapp.scss';
import AppContainer from './components/AppContainer/AppContainer';

const store = configureStore({});

render(
    <Provider store={ store }>
        <AppContainer/>
    </Provider>,
    document.getElementById('app'),
);
