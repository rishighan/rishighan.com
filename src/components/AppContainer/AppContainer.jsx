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
  extractPostByTagName,
  extractHeroImageFromPost,
} from "../../utils/post.utils";
import { AUTHENTICATED, UNAUTHENTICATED } from "../../constants/action-types";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    const user = localStorage.getItem('user');
    console.log(user)
    if(user) {
      this.props.setAuthenticatedUser();
    }
  }

  /**
   * Gets the Masthead image URL from a collection of posts.
   * @param {Array} posts - An array of post objects.
   * @return {String} - The Masthead image URL
   */
  getMastheadImageUrl(posts) {
    let mastheadPost = extractPostByTagName(posts, "Masthead");
    return extractHeroImageFromPost(mastheadPost[0]);
  }

  /**
   * Renders a Masthead component either on the
   * home page or a post tagged with 'projects'
   * @param {string} pathname - The path to be matched.
   * @return {Component} - Masthead component with the corresponding masthead image
   */
  displayMasthead(pathname) {
    let mastheadUrl;
    if (!_.isEmpty(this.props.blogPosts.posts)) {
      if (this.props.pathname === "/") {
        mastheadUrl = this.getMastheadImageUrl(this.props.blogPosts.posts);
      }
      const workPostPathPattern = this.matchPattern(pathname, /(\/post(.)*)/gm);
      if (!_.isNull(workPostPathPattern)) {
        mastheadUrl = extractHeroImageFromPost(this.props.blogPosts.posts);
      }
      return <Masthead mastheadImageUrl={mastheadUrl} />;
    }
  }

  /**
   * Matches a string with the provided regex.
   * @param {string} sourceText - The string to match.
   * @param {RegExp} pattern - A regular expression.
   */
  matchPattern(sourceText, pattern) {
    return sourceText.match(pattern);
  }

  /**
   * Finds out if a path matches /admin OR /login.
   * @return {Object} - Boolean values indicating if path matches /admin or /login.
   */
  isProtectedPath() {
    return {
      admin: this.matchPattern(this.props.pathname, /\/admin(.)*/gm) !== null,
      login: this.matchPattern(this.props.pathname, /\/login\/?/gm) !== null,
    };
  }

  render() {
    console.log(this.props.authenticated)
    return (
      // Masthead
      <>
        {this.displayMasthead(this.props.pathname)}

        {/* Admin navbar */}
        <ConnectedRouter history={history}>
          {this.isProtectedPath().admin ? (
            <AdminNavbar navItems={adminNavItems} />
          ) : null}
        </ConnectedRouter>

        <section className="section">
          <div className="container">
            {/* Site navbar */}
            <ConnectedRouter history={history}>
              {!this.isProtectedPath().admin &&
                !this.isProtectedPath().login && (
                  <SiteNavbar navItems={siteNavItems} />
                )}

              {/* Route configuration */}
              <div>
                <div className="columns is-centered">
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
  };
};

const mapDispatchToProps = dispatch => ({
  setAuthenticatedUser: () => {
    dispatch({
      type: AUTHENTICATED,
    })
  },
  deAuthenticateUser: () => {
    dispatch({
      type: UNAUTHENTICATED,
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
