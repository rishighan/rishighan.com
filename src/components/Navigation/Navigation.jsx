import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Work } from '../../pages/Work';

class Navigation extends Component {
  render() {
    return (!_.isEmpty(this.props.navItems)
            && <nav className="navbar is-full-mobile">
                <ul>
                    {this.props.navItems.map((navItem, idx) => <Link to={navItem.href} key={idx}>
                        <li>
                            {navItem.displayName}
                        </li>
                    </Link>)}
                    <Route path="/work" component={ Work } />
                </ul>
            </nav>
    );
  }
}
Navigation.propTypes = {
  navItems: PropTypes.array,
};

export default Navigation;
