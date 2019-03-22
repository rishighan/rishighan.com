import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Navigation extends Component {
  render() {
    return (!_.isEmpty(this.props.navItems)
            && <Router>
                    <nav className="navbar is-full-mobile">
                        <ul>
                            {this.props.navItems.map((navItem, idx) => <li key={ idx }>
                                <Link to={ navItem.href }>
                                    {navItem.displayName}
                                </Link>
                                <Route path={ navItem.href } component={ navItem.component } />
                            </li>)}
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
