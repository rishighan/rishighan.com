import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeContainer from './HomeContainer/HomeContainer';

const AppContainer = () => (
  <BrowserRouter>
    <HomeContainer />
  </BrowserRouter>
);

export default AppContainer;
