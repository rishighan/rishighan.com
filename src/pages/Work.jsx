import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/index';

class Work extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (<div> Work </div>);
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPosts() {
    const options = {
      callMethod: 'get',
      callURIAction: 'findByTagName',
      callParams: {
        tagName: 'Projects',
        pageOffset: 1,
        pageLimit: 10,
      },
    };
    dispatch(fetchPosts(options));
  },
});

export default Work;
