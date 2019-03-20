import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeContainer from './HomeContainer/HomeContainer';

const AppContainer = () => (
  <Router>
    <HomeContainer />
  </Router>
);

export default AppContainer;
