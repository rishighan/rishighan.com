import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import SiteNavbar from "../Navigation/SiteNavbar";
import AdminNavbar from "../Navigation/AdminNavbar";
import { history } from "../../store/index";
import Masthead from "../Masthead/Masthead";
import { siteNavItems, adminNavItems } from "../Navigation/NavItems";
import {
  extractPostByTagName,
  extractHeroImageFromPost,
} from "../../utils/post.utils";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Gets the Masthead image URL from a collection of posts.
   * @param {Array} posts - An array of post objects.
   */
  getMastheadImageUrl(posts) {
    let mastheadPost = extractPostByTagName(posts, "Masthead");
    return extractHeroImageFromPost(mastheadPost[0]);
  }

  /**
   * Renders a Masthead component either on the
   * home page or a post tagged with 'projects'
   * @param {string} pathname - The path to be matched.
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
   * Finds out if a path matches /admin or not.
   * @param {string} path - The path to match.
   */
  isAdminPath(path) {
    return this.matchPattern(path, /\/admin(.)*/gm) !== null;
  }

  render() {
    return (
      // Masthead
      <>
        {this.displayMasthead(this.props.pathname)}

        {/* Admin navbar */}
        <ConnectedRouter history={history}>
          {this.isAdminPath(this.props.pathname) ? (
            <AdminNavbar navItems={adminNavItems} />
          ) : null}
        </ConnectedRouter>

        <section className="section">
          <div className="container">
            {/* Site navbar */}
            <ConnectedRouter history={history}>
              {!this.isAdminPath(this.props.pathname) ? (
                <SiteNavbar navItems={siteNavItems} />
              ) : null}

              {/* Route configuration */}
              <div>
                <div className="columns is-centered">
                  {[...siteNavItems, ...adminNavItems].map((navItem, idx) => (
                    <Route
                      exact
                      path={navItem.href}
                      key={idx}
                      render={navItem.render}
                    />
                  ))}
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
  };
};

export default connect(mapStateToProps)(AppContainer);
