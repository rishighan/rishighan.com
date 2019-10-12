import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const Heading = props => (
  <header>
    { props.linkHref ?
      (<Link to={props.linkHref}>
        <h3>{props.headingText}</h3>
      </Link>) : <h3>{props.headingText}</h3> }
  </header>
);

Heading.propTypes = {
  headingText: PropTypes.string,
};
export default Heading;
