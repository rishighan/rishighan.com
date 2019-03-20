import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Work from '../../pages/Work';

class Navigation extends Component {
  render() {
    return (!_.isEmpty(this.props.navItems)
            && <Router>
                    <nav className="navbar is-full-mobile">
                    <ul>
                        {this.props.navItems.map((navItem, idx) => <Link to={ navItem.href } key={ idx }>
                            <li>
                                {navItem.displayName}
                            </li>
                        </Link>)}
                    </ul>
                    </nav>
                </Router>
    );
  }
}
Navigation.propTypes = {
  navItems: PropTypes.array,
};

export default Navigation;
