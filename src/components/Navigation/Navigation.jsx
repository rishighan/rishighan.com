import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AdminNavbar  from './AdminNavbar';

class Navigation extends Component {
  render() {
    return (!_.isEmpty(this.props.navItems)
      && <>
        

        <AdminNavbar />
      </>
    );
  }
}
Navigation.propTypes = {
  navItems: PropTypes.array,
};

export default Navigation;
