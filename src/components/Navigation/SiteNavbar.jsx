import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import _ from "lodash";

class SiteNavbar extends Component {
  render() {
    return (
      !_.isEmpty(this.props.navItems) && (
        <>
          <nav className="sitenav">
            <ul>
              <li className="logo">
                <ReactSVG
                  src="/public/assets/images/rishighan_logo.svg"
                  beforeInjection={(svg) => {
                    svg.classList.add("logo");
                    svg.setAttribute("style", "width: 50px");
                  }}
                />
              </li>
              {this.props.navItems.map((navItem, idx) => {
                return navItem.displayName ? (
                  <li key={idx}>
                    <Link to={navItem.href}>{navItem.displayName}</Link>
                  </li>
                ) : null;
              })}
            </ul>
          </nav>
        </>
      )
    );
  }
}
SiteNavbar.propTypes = {
  navItems: PropTypes.array,
};

export default SiteNavbar;
