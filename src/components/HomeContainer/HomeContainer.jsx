import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Post from '../Post/Post';
import Navigation from '../Navigation/Navigation';
import { fetchPosts } from '../../actions/index';

class HomeContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.navItems = [
      {
        displayName: 'home',
        href: '/',
      },
      {
        displayName: 'work',
        href: '/work',
      },
      {
        displayName: 'trampoline',
        href: '/trampoline',
      },
      {
        displayName: 'illustrations',
        href: '/illustrations',
      },
      {
        displayName: 'colophon',
        href: '/colophon',
      },
      {
        displayName: 'archive',
        href: '/archive',
      },
    ];
  }

  render() {
    return (!_.isEmpty(this.props.posts)
      && <section className="section">
          <Navigation navItems={ this.navItems } />
          <div className="container">
            <div className="columns is-centered">
              <Post data={this.props.posts} />
            </div>
          </div>
      </section>);
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
