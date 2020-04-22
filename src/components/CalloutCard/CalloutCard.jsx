import React, { Component } from "react";
import PropTypes from "prop-types";

class CalloutCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      data: [],
      error: {},
    };
  }
  componentDidMount() {
    if (!_.isUndefined(this.props.dataPromise)) {
      this.props.dataPromise.then((data, error) => {
        if (data) {
          this.setState({ data });
        } else {
          this.setState({ error });
        }
      });
    }
  }

  renderCalloutContent(data) {
    return _.map(data, (series, idx) => (
      <div key={idx}>
        <h6>{series.series_name}</h6>
        <ul>
          {_.map(series.post, (post, idx) => (
            <li key={idx}>{post.title}</li>
          ))}
        </ul>
      </div>
    ));
  }

  render() {
    const calloutContent = !_.isUndefined(this.state.data.data)
      ? this.state.data.data
      : this.props.data;
    return (
      <>
        <div className="callout-text has-text-grey">
          {this.props.calloutText}
        </div>
        <div className="callout-card-container">
          <div className="callout-cover has-background-info">
            {/* TODO: create own boxed-set icon */}
            <i className="fas fa-layer-group icon"></i>
          </div>
          <div className="callout-card-text">
            {this.renderCalloutContent(calloutContent)}
          </div>
        </div>
      </>
    );
  }
}

export default CalloutCard;
