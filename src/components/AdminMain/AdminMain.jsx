import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import List from '../List/List';
import { fetchPosts } from '../../actions/index';

class AdminMain extends Component {
  componentDidMount() {
    this.props.searchPosts();
    this.props.getPostStatistics();
  }

  render() {
    return (
      <div className="column content">
        <div className="columns is-multiline is-centered">
          <DebounceInput minLength={3}
            className="input column is-half"
            placeholder='Search Posts'
            debounceTimeout={450}
            onChange={e => this.props.searchPosts(e)}
          />

          <dl className="column is-one-quarter tile box">
            {_.map(this.props.statistics, statistic => <dd>{statistic.key} {statistic.count}</dd>)}
          </dl>

          <List>
            {!_.isEmpty(this.props.posts) ? this.props.posts.map(post => post) : []}
          </List>

          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            containerClassName={'pagination is-right'}
            pageLinkClassName={'pagination-link'}
            previousClassName={'pagination-previous'}
            nextClassName={'pagination-next'}
            pageCount={this.props.pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.props.nextPageHandler}
            activeClassName={'is-current'}
            disabledClassName={'disabled'}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts.docs,
    pages: state.posts.posts.pages,
    statistics: state.posts.statistics,
  };
}

const mapDispatchToProps = dispatch => ({
  searchPosts: (e) => {
    let actionConfig;
    if (!_.isUndefined(e) && !_.isEmpty(e.target.value)) {
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
      actionConfig = searchCallConfiguration;
    } else {
      const retrieveCallConfiguration = {
        callURIAction: 'retrieve',
        callMethod: 'get',
        callParams: {
          pageOffset: 1,
          pageLimit: 10,
        },
      };
      actionConfig = retrieveCallConfiguration;
    }
    dispatch(fetchPosts(actionConfig));
  },
  getPostStatistics: () => {
    dispatch(fetchPosts({
      callURIAction: 'getStatistics',
      callMethod: 'get',
    }));
  },
  nextPageHandler: (data) => {
    dispatch(fetchPosts({
      callURIAction: 'retrieve',
      callMethod: 'get',
      callParams: {
        pageOffset: data.selected + 1,
        pageLimit: 10,
      },
    }));
  },
});

AdminMain.propTypes = {
  posts: PropTypes.array,
  statistics: PropTypes.array,
  searchPosts: PropTypes.func,
  getPostStatistics: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
