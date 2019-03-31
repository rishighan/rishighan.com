import React, { Component } from 'react';
import format from 'date-fns/format';

const Timestamp = (props) => (
    <span className="content is-small">
        { format(props.date, props.dateFormat) }
    </span>
);

export default Timestamp;