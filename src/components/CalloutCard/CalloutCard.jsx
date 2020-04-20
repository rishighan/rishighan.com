import React from "react";
import PropTypes from "prop-types";

const CalloutCard = props => (
    <div className="callout-card-container">
        <div className="callout-cover has-background-info">
            {/* TODO: create own boxed-set icon */}
            <i className="fas fa-layer-group icon"></i>
        </div>
        <div className="callout-card-text">
            <h6>{props.heading}</h6>
            <ul>
                {_.map(props.listItems, (item, idx) => {
                    return <li key={idx}>{item.title}</li>
                })}
            </ul>
        </div>
    </div>
);

export default CalloutCard;
