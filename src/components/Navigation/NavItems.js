/* eslint-disable react/display-name */
import React from 'react';
import PageContainer from '../PageContainer/PageContainer';

const NavItems = [
  {
    displayName: 'home',
    href: '/',
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: 'get',
          callURIAction: 'filterPostsByTags',
          callParams: {
            pageOffset: 1,
            pageLimit: 10,
            queryDetails: {
              tagNames: ["Masthead", "blog"],
              operator: 'include',
            },
          },
        }}
        options={{
          type: 'post',
          metadata: {
            subType: 'blog',
          },
        }}
      />
    ),
  },
  {
    displayName: 'work',
    href: '/work',
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: 'get',
          callURIAction: 'findByTagName',
          callParams: {
            tagName: 'projects',
            pageOffset: 1,
            pageLimit: 5,
          },
        }}
        options={{
          type: 'post',
          metadata: {
            subType: 'titles',
          },
        }}
      />
    ),
  },
  {
    displayName: 'freeswim',
    href: '/freeswim',
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: 'get',
          callURIAction: 'findByTagName',
          callParams: {
            tagName: 'trampoline',
            pageOffset: 1,
            pageLimit: 5,
          },
        }}
        options={{
          type: 'post',
          metadata: {
            subType: 'blog',
          },
        }}
      />
    ),
  },
  {
    displayName: 'illustrations',
    href: '/illustrations',
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: 'get',
          callURIAction: 'findByTagName',
          callParams: {
            tagName: 'illustrations',
            pageOffset: 1,
            pageLimit: 5,
          },
        }}
        options={{
          type: 'post',
          metadata: {
            subType: 'illustrations',
          },
        }}
      />
    ),
  },
  {
    displayName: 'archive',
    href: '/archive',
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: 'get',
          callURIAction: 'getArchivedPosts',
        }}
        options={{
          type: 'post',
          metadata: {
            subType: 'archive',
          },
        }}
      />
    ),
  },
  {
    displayName: 'colophon',
    href: '/colophon',
    render: () => (
      <PageContainer
        callOptions={{
          callMethod: 'get',
          callURIAction: 'retrieveOne',
          callParams: {
            slug: 'colophon',
          },
        }}
        options={{
          type: 'post',
          metadata: {
            subType: 'single',
          },
        }}
      />
    ),
  },
];

export default NavItems;
