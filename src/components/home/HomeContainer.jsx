import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import ListItem from '../ListItem/ListItem';
import { fetchPosts } from '../../actions/index';

class HomeContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (!_.isEmpty(this.props.posts)
        && <div className="columns is-centered">
                <ListItem data={ this.props.posts } />
           </div>);
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

const mapDispatchToProps = dispatch => ({
  fetchPosts() {
    dispatch(fetchPosts());
  },
});

HomeContainer.propTypes = {
  posts: PropTypes.object,
  fetchPosts: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
