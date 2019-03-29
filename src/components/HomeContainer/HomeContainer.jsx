import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Post from '../Post/Post';
import { fetchPosts } from '../../actions/index';

class HomeContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (!_.isEmpty(this.props.posts)
      && <Post data={this.props.posts} />
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

const mapDispatchToProps = dispatch => ({
  fetchPosts() {
    const options = {
      callMethod: 'get',
      callURIAction: 'findByTagName',
      callParams: {
        tagName: 'Blog',
        pageOffset: 1,
        pageLimit: 10,
      },
    };
    dispatch(fetchPosts(options));
  },
});

HomeContainer.propTypes = {
  posts: PropTypes.object,
  fetchPosts: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
