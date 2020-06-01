import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { siteNavItems, adminNavItems } from "../Navigation/NavItems";
import SiteNavbar from "../Navigation/SiteNavbar";
import AdminNavbar from "../Navigation/AdminNavbar";
import PrivateRoute from "../Navigation/PrivateRoute";

import Login from "../Authentication/Login";
import { history } from "../../store/index";
import Masthead from "../Masthead/Masthead";
import {
  getMastheadImageUrl,
  matchPattern,
  extractHeroImageFromPost,
  isProtectedPath,
} from "../../utils/post.utils";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Renders a Masthead component either on the
   * home page or a post tagged with 'projects'
   * @param {string} pathname - The path to be matched.
   * @return {Component} - Masthead component with the corresponding masthead image
   */
  displayMasthead(pathname) {
    let masthead;
    if (!_.isEmpty(this.props.blogPosts.posts)) {
      if (this.props.pathname === "/") {
        masthead = this.props.masthead;
      }
      const postPathPattern = matchPattern(pathname, /(\/post(.)*)/gm);
      if (!_.isNull(postPathPattern)) {
        masthead = this.props.singleMasthead;
      }
      return !_.isUndefined(masthead) ? (
        <Masthead mastheadImage={masthead} />
      ) : null;
    }
  }

  render() {
    return (
      // Masthead
      <>
        {this.displayMasthead(this.props.pathname)}

        {/* Admin navbar */}
        <ConnectedRouter history={history}>
          {isProtectedPath(this.props.pathname).admin ? (
            <AdminNavbar navItems={adminNavItems} />
          ) : null}
        </ConnectedRouter>

        <section className="section">
          <div className="container">
            {/* Site navbar */}
            <ConnectedRouter history={history}>
              {!isProtectedPath(this.props.pathname).admin &&
                !isProtectedPath(this.props.pathname).login && (
                  <SiteNavbar navItems={siteNavItems} />
                )}

              {/* Route configuration */}
              <div>
                <div className="columns is-centered" >
                  {[...siteNavItems, ...adminNavItems].map((navItem, idx) =>
                    navItem.protected ? (
                      <PrivateRoute
                        exact
                        key={idx}
                        path={navItem.href}
                        authed={this.props.authenticated}
                        component={navItem.render}
                      />
                    ) : (
                      <Route
                        exact
                        path={navItem.href}
                        key={idx}
                        render={navItem.render}
                      />
                    )
                  )}
                  <Route path="/login" component={Login} />
                </div>
              </div>
            </ConnectedRouter>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pathname: state.router.location.pathname,
    search: state.router.location.search,
    hash: state.router.location.hash,
    blogPosts: state.posts,
    authenticated: state.user.authenticated,
    masthead: getMastheadImageUrl(state.posts.posts),
    singleMasthead: extractHeroImageFromPost(state.posts.posts),
  };
};

export default connect(mapStateToProps, {})(AppContainer);
