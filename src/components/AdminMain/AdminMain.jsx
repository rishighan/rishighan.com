import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import List from '../List/List';
import SearchBar from '../SearchBar/SearchBar';
import { fetchPosts } from '../../actions/index';

class AdminMain extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="column content is-two-thirds-tablet is-full-mobile">
        <SearchBar searchBarChangeHandler={this.props.searchPosts} />
        <List>
          {this.props.posts.posts.map(post => post)}
        </List>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPosts: () => dispatch(fetchPosts(ownProps.callOptions)),
  searchPosts: (e) => {
    const searchCallConfiguration = {
      callURIAction: 'searchPosts',
      callMethod: 'post',
      callParams: {
        pageOffset: 1,
        pageLimit: 10,
        searchTerm: e.target.value,
      },
    };
    const retrieveCallConfiguration = {
      callURIAction: 'retrieve',
      callMethod: 'get',
    };
    const actionConfig = e.target.value === '' ? retrieveCallConfiguration : searchCallConfiguration;
    dispatch(fetchPosts(actionConfig));
  },
});

AdminMain.propTypes = {
  posts: PropTypes.object,
  fetchPosts: PropTypes.func,
  searchPosts: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
