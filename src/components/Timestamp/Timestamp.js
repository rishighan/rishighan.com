import React from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

const Timestamp = props => (
    <div className="content is-small timestamp">
        { format(props.date, props.dateFormat) }
    </div>
);

Timestamp.propTypes = {
  date: PropTypes.string,
  dateFormat: PropTypes.string,
};
export default Timestamp;
