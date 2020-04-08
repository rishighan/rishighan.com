import React from 'react';
import PropTypes from 'prop-types';

const Masthead = props => (
    <div className="masthead-container">
        <figure className="masthead">
            <img src={props.mastheadImageUrl} />
        </figure>
    </div> );

export default Masthead;
