/* eslint-disable react/display-name */
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/index';
import Navigation from './Navigation/Navigation';
import Page from './Page/Page';
import postApiConfiguration from '../utils/postApi.config';


const navItems = [
  {
    displayName: 'home',
    href: '/',
    render: () => <Page callOptions={postApiConfiguration('get', 'findByTagName',
      {
        tagName: 'Blog',
        pageOffset: 1,
        pageLimit: 15,
      })}
      postOptions={
        {
          type: 'blog',
        }
      }
    />,
  },
  {
    displayName: 'work',
    href: '/work',
    render: () => <Page callOptions={postApiConfiguration('get', 'findByTagName',
      {
        tagName: 'Work',
        pageOffset: 1,
        pageLimit: 5,
      })}
      postOptions={
        {
          type: 'titles',
        }
      } />,
  },
  {
    displayName: 'trampoline',
    href: '/trampoline',
    render: () => <Page callOptions={postApiConfiguration('get', 'findByTagName',
      {
        tagName: 'Trampoline',
        pageOffset: 1,
        pageLimit: 5,
      })}
      postOptions={
        {
          type: 'blog',
        }
      } />,
  },
  {
    displayName: 'illustrations',
    href: '/illustrations',
    render: () => <Page callOptions={postApiConfiguration('get', 'findByTagName',
      {
        tagName: 'Illustrations',
        pageOffset: 1,
        pageLimit: 5,
      })}
      postOptions={
        {
          type: 'illustrations',
        }
      } />,
  },
  {
    displayName: 'archive',
    href: '/archive',
    render: () => <Page callOptions={postApiConfiguration('get', 'getArchivedPosts')}
      postOptions={
        {
          type: 'archive',
        }
      } />,
  },
  {
    displayName: 'colophon',
    href: '/colophon',
    render: () => <Page callOptions={
      {
        callMethod: 'get',
        callURIAction: 'findByTagName',
        callParams: {
          tagName: 'colophon',
        },
      }
    } postOptions={
      {
        type: 'single',
      }
    } />
  },
];

const AppContainer = () => (
  <section className="section">
    <div className="container">
      <ConnectedRouter history={history}>
        <div>
          {/* <Navigation navItems={navItems} /> */}
          <nav className="navbar is-full-mobile">
            <ul>
              {navItems.map((navItem, idx) => <li key={idx}>
                <Link to={navItem.href}>
                  {navItem.displayName}
                </Link>
              </li>)}
            </ul>
          </nav>
          <div className="columns is-centered">
            {navItems.map((navItem, idx) => <Route exact path={navItem.href}
              key={idx}
              render={navItem.render} />)}
            <Route path={'/post/:postSlug'} render={props => <Page callOptions={
              {
                callMethod: 'get',
                callURIAction: 'retrieve',
                callParams: {
                  slug: props.match.params.postSlug,
                },
              }
            } postOptions={
              {
                type: 'single',
              }
            } />} />
          </div>
        </div>
      </ConnectedRouter>
    </div>
  </section>
);

export default AppContainer;
