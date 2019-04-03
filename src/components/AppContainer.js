/* eslint-disable react/display-name */
import React from 'react';
import {
  Route, Link, BrowserRouter as Router,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/index';
import Navigation from './Navigation/Navigation';
import Page from './Page/Page';


const navItems = [
  {
    displayName: 'home',
    href: '/',
    render: () => <Page callOptions={
        {
          callMethod: 'get',
          callURIAction: 'findByTagName',
          callParams: {
            tagName: 'Blog',
            pageOffset: 1,
            pageLimit: 10,
          },
        }
      } postOptions={
        {
          type: 'blogPost',
        }
      } />,
  },
  {
    displayName: 'work',
    href: '/work',
    render: () => <Page callOptions={
        {
          callMethod: 'get',
          callURIAction: 'findByTagName',
          callParams: {
            tagName: 'Work',
            pageOffset: 1,
            pageLimit: 5,
          },
        }
      } postOptions={
        {
          type: 'titles',
        }
      } />,
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
      <ConnectedRouter history={ history }>
        <div>
          {/* <Navigation navItems={navItems} /> */}
          <nav className="navbar is-full-mobile">
            <ul>
              {navItems.map((navItem, idx) => <li key={ idx }>
                <Link to={ navItem.href }>
                  { navItem.displayName }
                </Link>
              </li>)}
            </ul>
          </nav>
          <div className="columns is-centered">
            {navItems.map((navItem, idx) => <Route exact path={ navItem.href }
                                                   key={ idx } 
                                                   render={ navItem.render } />)}
          </div>
        </div>
      </ConnectedRouter>
    </div>
  </section>
);

export default AppContainer;
