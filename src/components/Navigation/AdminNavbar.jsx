import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOutAction } from "../../actions/user.actions";
import { ReactSVG } from "react-svg";

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
          <ReactSVG
                  src="/public/assets/images/rishighan_logo.svg"
                  beforeInjection={(svg) => {
                    svg.classList.add("logo");
                    svg.setAttribute("style", "width: 50px");
                  }}
                  className="logo"
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
            <li className="navbar-item">
             
              <Link to="/" onClick={this.props.signOutAction}>
                Logout
              </Link>
            </li>
            <li className="navbar-item">
                {!_.isUndefined(localStorage.getItem("username"))
                ? 'Logged in as ' + localStorage.getItem("username")
                : null}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(null, { signOutAction })(AdminNavbar);
