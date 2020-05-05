import React from "react";
import PageContainer from "../PageContainer/PageContainer";
import PrivateRoute from "../Navigation/PrivateRoute";
import { postModel } from "../../constants/post.model";

export const siteNavItems = [
  {
    displayName: "home",
    href: "/",
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: "get",
          callURIAction: "filterPostsByTags",
          callParams: {
            pageOffset: 1,
            pageLimit: 10,
            queryDetails: {
              tagNames: ["Masthead", "blog"],
              operator: "include",
            },
          },
        }}
        options={{
          type: "post",
          metadata: {
            subType: "blog",
          },
        }}
      />
    ),
  },
  {
    displayName: "work",
    href: "/work",
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: "get",
          callURIAction: "findByTagName",
          callParams: {
            tagName: "projects",
            pageOffset: 1,
            pageLimit: 5,
          },
        }}
        options={{
          type: "post",
          metadata: {
            subType: "titles",
          },
        }}
      />
    ),
  },
  {
    displayName: "freeswim",
    href: "/freeswim",
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: "get",
          callURIAction: "findByTagName",
          callParams: {
            tagName: "trampoline",
            pageOffset: 1,
            pageLimit: 5,
          },
        }}
        options={{
          type: "post",
          metadata: {
            subType: "blog",
          },
        }}
      />
    ),
  },
  {
    displayName: "illustrations",
    href: "/illustrations",
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: "get",
          callURIAction: "findByTagName",
          callParams: {
            tagName: "illustrations",
            pageOffset: 1,
            pageLimit: 5,
          },
        }}
        options={{
          type: "post",
          metadata: {
            subType: "illustrations",
          },
        }}
      />
    ),
  },
  {
    displayName: "archive",
    href: "/archive",
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: "get",
          callURIAction: "getArchivedPosts",
        }}
        options={{
          type: "post",
          metadata: {
            subType: "archive",
          },
        }}
      />
    ),
  },
  {
    displayName: "colophon",
    href: "/colophon",
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: "get",
          callURIAction: "retrieveOne",
          callParams: {
            slug: "colophon",
          },
        }}
        options={{
          type: "post",
          metadata: {
            subType: "single",
          },
        }}
      />
    ),
  },
  {
    href: "/post/:postSlug",
    render: (props) => (
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
            path: props.pathname,
          },
        }}
      />
    ),
  },
];

export const adminNavItems = [
  {
    href: "/admin",
    displayName: "dashboard",
    protected: true,
    render: () => (
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
          type: "adminDashboard",
          metadata: {},
        }}
      />
    ),
  },
  {
    href: "/admin/write",
    displayName: "write",
    protected: true,
    render: (props) => (
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
    ),
  },
  {
    displayName: "manage series",
    href: "/admin/manage/series",
    protected: true,
    render: (props) => (
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
    ),
  },

  {
    href: "/admin/edit/:postSlug",
    protected: true,
    render: (props) => (
      <PageContainer
        callOptions={{
          callMethod: "get",
          callURIAction: "retrieveOne",
          callParams: {
            slug: props.match.params.postSlug,
          },
        }}
        options={{
          type: "editForm",
          metadata: {
            mode: "edit",
          },
        }}
      />
    ),
  },
];
