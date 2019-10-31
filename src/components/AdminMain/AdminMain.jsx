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
    this.props.getDrafts();
  }

  render() {
    return (
      <div className="column content is-11">
        <div className="columns is-multiline">

          <div className="column is-half">
            <DebounceInput
              minLength={3}
              className="input search has-text-primary subtitle is-3"
              placeholder='Search Posts'
              debounceTimeout={450}
              onChange={e => this.props.searchPosts(e)}
            />

            <List showTags>
              {!_.isEmpty(this.props.posts) ? this.props.posts.map(post => post) : []}
            </List>

            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'&hellip;'}
              breakClassName={'pagination-ellipsis'}
              containerClassName={'pagination'}
              pageLinkClassName={'pagination-link'}
              previousClassName={'pagination-previous'}
              nextClassName={'pagination-next'}
              pageCount={this.props.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.props.nextPageHandler}
              activeClassName={'is-current'}
              disabledClassName={'disabled'}
            />
          </div>

          <div className="column">
            <div className="columns">
              <div className="column is-half">
                <div className="tile is-vertical notification has-background-light">
                  {_.map(this.props.statistics, (statistic, idx) => <>
                    <p className="subtitle is-6 is-family-monospace" key={idx}>{statistic.count} {statistic.key} </p>
                  </>)}
                </div>
              </div>
            </div>
            <p className="subtitle is-3">Drafts</p>
            <List showTags={false}>
              {!_.isEmpty(this.props.drafts) ? this.props.drafts.docs.map(draft => draft) : []}
            </List>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts.docs,
    pageCount: state.posts.posts.pages,
    statistics: state.posts.statistics,
    drafts: state.posts.drafts,
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
  getDrafts: () => {
    dispatch(fetchPosts({
      callURIAction: 'getDrafts',
      callMethod: 'get',
      callParams: {
        pageOffset: 1,
        pageLimit: 5,
      },
    }));
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
  drafts: PropTypes.object,
  statistics: PropTypes.array,
  searchPosts: PropTypes.func,
  getDrafts: PropTypes.func,
  getPostStatistics: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
