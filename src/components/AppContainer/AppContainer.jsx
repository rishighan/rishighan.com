import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import SiteNavbar from "../Navigation/SiteNavbar";
import AdminNavbar from "../Navigation/AdminNavbar";
import PageContainer from "../PageContainer/PageContainer";
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

  // Still reeling from the mental gymnastics
  // I performed to retrieve one URL
  getMastheadImageUrl(posts) {
    let mastheadPost = extractPostByTagName(posts, "Masthead");
    return extractHeroImageFromPost(mastheadPost);
  }

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
      // Home page Masthead
      <>
        {this.props.pathname === "/" ? (
          <Masthead
            mastheadImageUrl={
              this.props.blogPosts
                ? this.getMastheadImageUrl(this.props.blogPosts.posts)
                : null
            }
          />
        ) : null}

        {/* Single Post Masthead */}

        <section className="section">
          <div className="container">
            <ConnectedRouter history={history}>
              {/* Admin navbar */}
              {this.isAdminPath(this.props.pathname) ? (
                <AdminNavbar navItems={adminNavItems} />
              ) : null}

              {/* Site navbar */}
              {!this.isAdminPath(this.props.pathname) ? (
                <SiteNavbar navItems={siteNavItems} />
              ) : null}
              <div>
                {/* Route configuration */}
                <div className="columns is-centered">
                  {[...siteNavItems, ...adminNavItems].map((navItem, idx) => (
                    <Route
                      exact
                      path={navItem.href}
                      key={idx}
                      render={navItem.render}
                    />
                  ))}
                  <Route
                    path={"/post/:postSlug"}
                    render={(props) => (
                      <PageContainer
                        callOptions={{
                          callMethod: "get",
                          callURIAction: "retrieveOne",
                          callParams: {
                            slug: props.match.params.postSlug,
                          },
                        }}
                        options={{
                          type: "post",
                          metadata: {
                            subType: "single",
                            path: history.location.pathname,
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
