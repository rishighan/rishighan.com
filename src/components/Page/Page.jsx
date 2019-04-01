import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Post from '../Post/Post';
import { fetchPosts } from '../../actions/index';

class Page extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (_.isEmpty(this.props.posts) ? 'loading...'
      : <Post data={ this.props.posts }
               postType={ this.props.postOptions.type } />
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPosts() {
    dispatch(fetchPosts(ownProps.callOptions));
  },
});

Page.propTypes = {
  posts: PropTypes.object,
  fetchPosts: PropTypes.func,
  postOptions: PropTypes.object,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
