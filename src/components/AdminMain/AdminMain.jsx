import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import List from '../List/List';
import SearchBar from '../SearchBar/SearchBar';
import { fetchPosts } from '../../actions/index';

class AdminMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="column content is-two-thirds-tablet is-full-mobile">
        <SearchBar searchBarChangeHandler={this.props.debouncedSearchPosts} />
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

const debouncedSearchPosts = (e, dispatch) => {
  console.log(e)
  const searchTextValue = e.target.value;
  const searchCallConfiguration = {
    callURIAction: 'searchPosts',
    callMethod: 'post',
    callParams: {
      pageOffset: 1,
      pageLimit: 10,
      searchTerm: searchTextValue,
    },
  };
  const retrieveCallConfiguration = {
    callURIAction: 'retrieve',
    callMethod: 'get',
  };
  const actionConfig = searchTextValue === '' ? retrieveCallConfiguration : searchCallConfiguration;
  dispatch(fetchPosts(actionConfig))
}

const mapDispatchToProps = dispatch => ({
  debouncedSearchPosts: (e) => debouncedSearchPosts(e, dispatch)
});

AdminMain.propTypes = {
  posts: PropTypes.object,
  searchPosts: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
