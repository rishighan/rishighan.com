import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import SiteNavbar from '../Navigation/SiteNavbar';
import PageContainer from '../PageContainer/PageContainer';
import { history } from '../../store/index';
import Masthead from '../Masthead/Masthead';
import NavItems from '../Navigation/NavItems';
import { postsAPICall } from '../../actions/index';
import { postModel } from '../../constants/post.model';

class AppContainer extends Component {
  render() {
    return (<>
      {this.props.pathname === '/' ? <Masthead /> : null}
      <section className="section">
        <div className="container">
          <ConnectedRouter history={history}>
            <SiteNavbar navItems={NavItems} />
            <div>
              {/* Route configuration */}
              <div className="columns is-centered">
                {NavItems.map((navItem, idx) => (
                  <Route
                    exact
                    path={navItem.href}
                    key={idx}
                    render={navItem.render}
                  />
                ))}
                <Route
                  path={'/post/:postSlug'}
                  render={props => (
                    <PageContainer
                      callOptions={{
                        callMethod: 'get',
                        callURIAction: 'retrieveOne',
                        callParams: {
                          slug: props.match.params.postSlug,
                        },
                      }}
                      options={{
                        type: 'post',
                        metadata: {
                          subType: 'single',
                          path: history.location.pathname,
                        },
                      }}
                    />
                  )}
                />
                <Route
                  path={'/admin'}
                  exact
                  render={() => (
                    <PageContainer
                      callOptions={{
                        callMethod: 'get',
                        callURIAction: 'retrieve',
                        callParams: {
                          pageOffset: 1,
                          pageLimit: 10,
                        },
                      }}
                      options={{
                        type: 'adminMain',
                        metadata: {},
                      }}
                    />
                  )}
                />
                {/* Edit post form route */}
                <Route
                  path={'/admin/edit/:postSlug'}
                  exact
                  render={props => (
                    <PageContainer
                      callOptions={{
                        callMethod: 'get',
                        callURIAction: 'retrieveOne',
                        callParams: {
                          slug: props.match.params.postSlug,
                        },
                      }}
                      options={{
                        type: 'editPostForm',
                        metadata: {
                          mode: 'edit',
                        },
                      }}
                    />
                  )}
                />
                {/* New post, started as a draft */}
                <Route
                  path={'/admin/write'}
                  exact
                  render={props => (
                    <PageContainer
                      callOptions={{
                        callMethod: 'post',
                        callURIAction: 'create',
                        data: postModel,
                      }}
                      options={{
                        type: 'newPostForm',
                        metadata: {
                          mode: 'new',
                        },
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </ConnectedRouter>
        </div>
      </section>
    </>);
  }
}

const mapStateToProps = state => {
  return {
    pathname: state.router.location.pathname,
    search: state.router.location.search,
    hash: state.router.location.hash,
  }
}

export default connect(mapStateToProps)(AppContainer);
