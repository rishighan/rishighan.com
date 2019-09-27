import React, { Component } from 'react';
import PropTypes from 'prop-types';


class List extends Component {
  render() {
    return <div>{props.children}</div>
  }
}

List.propTypes = {
  children: PropTypes.Component,
};

export default List;
