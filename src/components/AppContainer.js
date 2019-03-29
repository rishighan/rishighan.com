import React from 'react';
import {
  Route, Link, BrowserRouter as Router,
} from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import HomeContainer from './HomeContainer/HomeContainer';
import Work from '../pages/Work';


const navItems = [
  {
    displayName: 'home',
    href: '/',
    component: HomeContainer,
  },
  {
    displayName: 'work',
    href: '/work',
    component: Work,
  },
  // {
  //   displayName: 'trampoline',
  //   href: '/trampoline',
  //   component: 'Trampoline',
  // },
  // {
  //   displayName: 'illustrations',
  //   href: '/illustrations',
  //   component: 'Illustrations',
  // },
  // {
  //   displayName: 'colophon',
  //   href: '/colophon',
  //   component: 'Colophon',
  // },
  // {
  //   displayName: 'archive',
  //   href: '/archive',
  //   component: 'Archive',
  // },
];

const AppContainer = () => (
  <section className="section">
    <div className="container">
      <Router>
       <div>
          {/* <Navigation navItems={navItems} /> */}
          <nav className="navbar is-full-mobile">
              <ul>
                  {navItems.map((navItem, idx) => <li key={ idx }>
                      <Link to={ navItem.href }>
                          {navItem.displayName}
                      </Link>
                  </li>)}
              </ul>
          </nav>
          <div className="columns is-centered">
            {navItems.map((navItem, idx) => <Route exact path={ navItem.href } key={ idx } component={ navItem.component } />)}
          </div>
        </div>
      </Router>
    </div>
  </section>
);

export default AppContainer;
