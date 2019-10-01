import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../List/List';
import SearchBar from '../SearchBar/SearchBar';

class AdminMain extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <List>
          {this.props.data.posts.map(post => post)}
        </List>
      </div>
    );
  }
}
AdminMain.propTypes = {
  data: PropTypes.object,
};
export default AdminMain;
