import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PageFragment from '../PageFragment/PageFragment';
import AdminForm from '../AdminForm/AdminForm';
import AdminMain from '../AdminMain/AdminMain';
import SeriesForm from '../AdminForm/SeriesForm';
import { postsAPICall } from '../../actions/index';

const renderPage = props => ({
  post: (
    <div className="column content is-two-thirds-tablet is-full-mobile">
      <PageFragment
        postsData={props.posts}
        singlePostData={props.posts.posts}
        postType={props.options.metadata.subType}
      />
    </div>
  ),
  seriesForm: <SeriesForm data={props.options.metadata.seedData}/>,
  adminDashboard: <AdminMain />,
  editForm: !_.isArray(props.posts.posts) && props.options.metadata.mode === 'edit' ? (
    <AdminForm formData={props.posts.posts} />
  ) : null,
  newPostForm: props.options.metadata.mode === 'new' ? <AdminForm formData={props.posts.result} /> : null,
});

class PageContainer extends Component {
  componentDidMount() {
    if(!_.isUndefined(this.props.callOptions)) {
      this.props.fetchPosts();
    }
  }
  render = () => renderPage(this.props)[this.props.options.type];
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    newPost: state.posts.result,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPosts() {
    dispatch(postsAPICall(ownProps.callOptions));
  },
});

PageContainer.propTypes = {
  posts: PropTypes.object,
  options: PropTypes.object,
  fetchPosts: PropTypes.func,
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PageContainer),
);
