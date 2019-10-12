import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PageFragment from '../PageFragment/PageFragment';
import AdminForm from '../AdminForm/AdminForm';
import AdminMain from '../AdminMain/AdminMain';
import { fetchPosts } from '../../actions/index';

const renderPage = (props) => {
  return {
    post: <div className="column content is-two-thirds-tablet is-full-mobile">
            <PageFragment postsData={ props.posts }
                       postType={ props.options.metadata.subType } />
        </div>,
    adminMain: <AdminMain />,
    adminForm: !_.isEmpty(props.posts.posts[0]) ? <AdminForm formData={ props.posts.posts[0] } /> : null,
  };
};
class PageContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return renderPage(this.props)[this.props.options.type];
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

PageContainer.propTypes = {
  posts: PropTypes.object,
  options: PropTypes.object,
  fetchPosts: PropTypes.func,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageContainer));
