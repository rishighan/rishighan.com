import React from "react";
import PropTypes from "prop-types";

const Masthead = (props) => (
  <div className="masthead-container">
    <figure className="masthead">
      <img src={props.mastheadImage.url} />
    </figure>
    <div className="masthead-title-container">
      <span className="masthead-title">{props.mastheadImage.title}</span>
    </div>
  </div>
);

export default Masthead;
