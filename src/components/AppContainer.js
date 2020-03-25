import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../store/index";
import Navigation from "./Navigation/Navigation";
import PageContainer from "./PageContainer/PageContainer";
import NavItems from "./Navigation/NavItems";

const AppContainer = () => (
  <section className="section">
    <div className="container">
      <ConnectedRouter history={history}>
        <div>
          <Navigation navItems={NavItems} />
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
              render={props => (
                <PageContainer
                  callOptions={{
                    callMethod: "get",
                    callURIAction: "retrieveOne",
                    callParams: {
                      slug: props.match.params.postSlug
                    }
                  }}
                  options={{
                    type: "post",
                    metadata: {
                      subType: "single"
                    }
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
                      pageLimit: 10
                    }
                  }}
                  options={{
                    type: "adminMain",
                    metadata: {}
                  }}
                />
              )}
            />
            {/* Edit post form route */}
            <Route
              path={"/admin/edit/:postSlug"}
              exact
              render={props => (
                <PageContainer
                  callOptions={{
                    callMethod: "get",
                    callURIAction: "retrieveOne",
                    callParams: {
                      slug: props.match.params.postSlug
                    }
                  }}
                  options={{
                    type: "adminForm",
                    metadata: {
                      mode: "edit"
                    }
                  }}
                />
              )}
            />
          </div>
        </div>
      </ConnectedRouter>
    </div>
  </section>
);

export default AppContainer;
