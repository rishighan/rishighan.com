import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOutAction } from "../../actions/user.actions";

class AdminNavbar extends Component {
  render() {
    return (
      <nav
        className="navbar rg-admin-navbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <ul className="navbar-start">
            {this.props.navItems.map((navItem, idx) => (
              <li className="navbar-item" key={idx}>
                <Link to={navItem.href}>{navItem.displayName}</Link>
              </li>
            ))}
            <li>
              <Link to="/" onClick={this.props.signOutAction}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(null, { signOutAction })(AdminNavbar);
