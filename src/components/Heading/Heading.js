import React from 'react';
import PropTypes from 'prop-types';

const Heading = props => (
    <header>
        <h3>{ props.headingText }</h3>
    </header>
);

Heading.propTypes = {
  headingText: PropTypes.string,
};
export default Heading;
