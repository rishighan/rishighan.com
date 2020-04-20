import React from "react";
import PropTypes from "prop-types";

const CalloutCard = props => (
    <div className="callout-card-container">
            <div className="callout-cover has-background-info">
                {/* TODO: create own boxed-set icon */}
                <i class="fas fa-layer-group icon"></i>    
            </div>    
            <div className="callout-card-text">
                <ul>
                    <li>One of many, to lead the few</li>
                    <li>Fort of stone made anew</li>
                    <li>Fate so rich, it could never last</li>
                </ul>
            </div>
    </div>
);

export default CalloutCard;
