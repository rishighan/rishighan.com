import React from 'react';
import * as dayjs from 'dayjs';
import PropTypes from 'prop-types';

const Timestamp = props => (
    <span className="content is-small timestamp">
        { props.date ? dayjs(props.date).format(props.dateFormat) : null }
    </span>
);

Timestamp.propTypes = {
  date: PropTypes.string,
  dateFormat: PropTypes.string,
};
export default Timestamp;
