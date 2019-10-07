import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import List from '../List/List';
import { fetchPosts } from '../../actions/index';

class AdminMain extends Component {
  render() {
    console.log(this.props.posts)
    return (
      <div className="column content is-two-thirds-tablet is-full-mobile">
        <DebounceInput minLength={3}
                       debounceTimeout={450}
                       onChange={e => this.props.searchPosts(e)}
                       />
        <List>
          {!_.isEmpty(this.props.posts.posts) ? this.props.posts.posts.map(post => post) : [] }
        </List>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={3}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          activeClassName={'active'}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

const mapDispatchToProps = dispatch => ({
  searchPosts: (e) => {
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
      callParams: {
        pageOffset: 1,
        pageLimit: 10,
      },
    };
    const actionConfig = searchTextValue === '' ? retrieveCallConfiguration : searchCallConfiguration;
    dispatch(fetchPosts(actionConfig));
  },
});

AdminMain.propTypes = {
  posts: PropTypes.object,
  searchPosts: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
