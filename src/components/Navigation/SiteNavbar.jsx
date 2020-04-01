import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

class SiteNavbar extends Component {
  render() {
    return (!_.isEmpty(this.props.navItems)
      && <>
        <nav className="sitenav is-full-mobile">
          <ul>
            {this.props.navItems.map((navItem, idx) => <li key={idx}>
              <Link to={navItem.href}>
                {navItem.displayName}
              </Link>
            </li>)}
          </ul>
        </nav>
      </>
    );
  }
}
SiteNavbar.propTypes = {
  navItems: PropTypes.array,
};

export default SiteNavbar;
