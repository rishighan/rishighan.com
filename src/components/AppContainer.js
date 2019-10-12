/* eslint-disable react/display-name */
import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/index';
import Navigation from './Navigation/Navigation';
import PageContainer from './PageContainer/PageContainer';
import postApiConfiguration from '../utils/postApi.config';


const navItems = [
  {
    displayName: 'home',
    href: '/',
    render: () => <PageContainer callOptions={postApiConfiguration('get', 'findByTagName',
      {
        tagName: 'Blog',
        pageOffset: 1,
        pageLimit: 25,
      })}
      options={
        {
          type: 'post',
          metadata: {
            subType: 'blog',
          },
        }
      }
    />,
  },
  {
    displayName: 'work',
    href: '/work',
    render: () => <PageContainer callOptions={postApiConfiguration('get', 'findByTagName',
      {
        tagName: 'Work',
        pageOffset: 1,
        pageLimit: 5,
      })}
      options={
        {
          type: 'post',
          metadata: {
            subType: 'titles',
          },
        }
      } />,
  },
  {
    displayName: 'freeswim',
    href: '/freeswim',
    render: () => <PageContainer callOptions={postApiConfiguration('get', 'findByTagName',
      {
        tagName: 'Trampoline',
        pageOffset: 1,
        pageLimit: 5,
      })}
      options={
        {
          type: 'post',
          metadata: {
            subType: 'blog',
          },
        }
      } />,
  },
  {
    displayName: 'illustrations',
    href: '/illustrations',
    render: () => <PageContainer callOptions={postApiConfiguration('get', 'findByTagName',
      {
        tagName: 'Illustrations',
        pageOffset: 1,
        pageLimit: 5,
      })}
      options={
        {
          type: 'post',
          metadata: {
            subType: 'illustrations',
          },
        }
      } />,
  },
  {
    displayName: 'archive',
    href: '/archive',
    render: () => <PageContainer callOptions={postApiConfiguration('get', 'getArchivedPosts')}
      options={
        {
          type: 'post',
          metadata: {
            subType: 'archive',
          },
        }
      } />,
  },
  {
    displayName: 'colophon',
    href: '/colophon',
    render: () => <PageContainer callOptions={
      {
        callMethod: 'get',
        callURIAction: 'findByTagName',
        callParams: {
          tagName: 'colophon',
        },
      }
    } options={
      {
        type: 'post',
        metadata: {
          subType: 'single',
        },
      }
    } />,
  },
];

const AppContainer = () => (
  <section className="section">
    <div className="container">
      <ConnectedRouter history={history}>
        <div>
          <Navigation navItems={navItems} />
          {/* Route configuration */}
          <div className="columns is-centered">
            {navItems.map((navItem, idx) => <Route exact path={navItem.href}
              key={idx}
              render={navItem.render} />)}
            <Route path={'/post/:postSlug'} render={props => <PageContainer callOptions={
              {
                callMethod: 'get',
                callURIAction: 'retrieve',
                callParams: {
                  slug: props.match.params.postSlug,
                  pageOffset: 1,
                  pageLimit: 1,
                },
              }
            } options={
              {
                type: 'post',
                metadata: {
                  subType: 'single',
                },
              }
            } />} />
            <Route path={'/admin'} exact render={props => <PageContainer callOptions={{
              callMethod: 'get',
              callURIAction: 'retrieve',
            }} options={
              {
                type: 'adminMain',
                metadata: {

                },
              }
            } />} />
            {/* Edit post form route */}
            <Route path={'/admin/edit/:postSlug'} exact render={props => <PageContainer callOptions={{
              callMethod: 'get',
              callURIAction: 'retrieve',
              callParams: {
                slug: props.match.params.postSlug,
              },
            }} options={
              {
                type: 'adminForm',
                metadata: {
                  mode: 'edit',
                },
              }
            } />} />
          </div>
        </div>
      </ConnectedRouter>
    </div>
  </section>
);

export default AppContainer;
