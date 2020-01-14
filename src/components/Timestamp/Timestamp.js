import React from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

const Timestamp = props => (
    <span className="content is-small timestamp">
        { props.date ? format(props.date, props.dateFormat) : null }
    </span>
);

Timestamp.propTypes = {
  date: PropTypes.string,
  dateFormat: PropTypes.string,
};
export default Timestamp;
