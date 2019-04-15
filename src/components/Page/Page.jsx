import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Post from '../Post/Post';
import AdminForm from '../AdminForm/AdminForm';
import { fetchPosts } from '../../actions/index';

class Page extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render(){
    return renderPage(this.props)[this.props.pageType];
  }
}

const renderPage = props => ({
  'post': <div className="column content is-two-thirds-tablet is-full-mobile">
            <Post data={ props.posts }
                  postType={ props.options.type } />
          </div>,
  'adminForm': <AdminForm formData={ props.posts } />
});

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
