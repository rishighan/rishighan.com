import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const Heading = props => (
  <header>
    <Link to={props.linkHref}>
      <h3>{props.headingText}</h3>
    </Link>
  </header>
);

Heading.propTypes = {
  headingText: PropTypes.string,
};
export default Heading;
