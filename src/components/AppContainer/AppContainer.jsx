import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import SiteNavbar from "../Navigation/SiteNavbar";
import AdminNavbar from "../Navigation/AdminNavbar";
import PageContainer from "../PageContainer/PageContainer";
import { history } from "../../store/index";
import Masthead from "../Masthead/Masthead";
import NavItems from "../Navigation/NavItems";
import { postModel } from "../../constants/post.model";
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

  isAdminPath(path) {
    console.log(this.matchPattern(path, /\/admin\/(.)*/gm) !== null);
    return this.matchPattern(path, /\/admin\/(.)*/gm) !== null;
  }
  render() {
    return (
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

        {this.isAdminPath(this.props.pathname) ? <AdminNavbar /> : null}
        <section className="section">
          <div className="container">
            <ConnectedRouter history={history}>
              {!this.isAdminPath(this.props.pathname) ? (
                <SiteNavbar navItems={NavItems} />
              ) : null}
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
                  {/* Series form routes */}
                  <Route
                    path={"/admin/manage/series"}
                    render={(props) => (
                      <PageContainer
                        options={{
                          type: "seriesForm",
                          metadata: {
                            seedData: {
                              series_name: "",
                              post: [],
                            },
                          },
                        }}
                      />
                    )}
                  />

                  <Route
                    path={"/admin"}
                    exact
                    render={() => (
                      <PageContainer
                        callOptions={{
                          callMethod: "get",
                          callURIAction: "retrieve",
                          callParams: {
                            pageOffset: 1,
                            pageLimit: 10,
                          },
                        }}
                        options={{
                          type: "adminMain",
                          metadata: {},
                        }}
                      />
                    )}
                  />
                  {/* Edit post form route */}
                  <Route
                    path={"/admin/edit/:postSlug"}
                    exact
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
                          type: "editPostForm",
                          metadata: {
                            mode: "edit",
                          },
                        }}
                      />
                    )}
                  />
                  {/* New post, started as a draft */}
                  <Route
                    path={"/admin/write"}
                    exact
                    render={(props) => (
                      <PageContainer
                        callOptions={{
                          callMethod: "post",
                          callURIAction: "create",
                          data: postModel,
                        }}
                        options={{
                          type: "newPostForm",
                          metadata: {
                            mode: "new",
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
