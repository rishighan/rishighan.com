import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Navigation extends Component {
  render() {
    return (!_.isEmpty(this.props.navItems)
            && <nav className="navbar is-full-mobile">
                <ul>
                    {this.props.navItems.map((navItem, idx) => <li key={ idx }>
                        { navItem.displayName }
                    </li>)}
                </ul>
            </nav>
    );
  }
}
Navigation.propTypes = {
  navItems: PropTypes.object,
};

export default Navigation;
