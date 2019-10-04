import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PageBlock from '../PageBlock/PageBlock';
import AdminForm from '../AdminForm/AdminForm';
import AdminMain from '../AdminMain/AdminMain';
import { fetchPosts } from '../../actions/index';

const renderPage = props => ({
  post: <div className="column content is-two-thirds-tablet is-full-mobile">
            <PageBlock data={ props.posts }
                       postType={ props.options.metadata.subType } />
        </div>,
  adminMain: <AdminMain />,
  adminForm: !_.isEmpty(props.posts.posts[0]) ? <AdminForm formData={ props.posts.posts[0] } /> : null,
});
class Page extends Component {
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

Page.propTypes = {
  posts: PropTypes.object,
  options: PropTypes.object,
  fetchPosts: PropTypes.func,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
