import React, { Component } from 'react';
import kramed from 'kramed';
import hljs from 'highlight.js';
import Interweave from 'interweave';
import PropTypes from 'prop-types';
import 'highlight.js/styles/kimbie.dark.css';
import _ from 'lodash';

const options = {
  renderer: new kramed.Renderer({
    highlight: code => hljs.highlightAuto(code).value,
    gfm: true,
    tables: true,
    breaks: true,
    xhtml: true,
    smartLists: true,
    smartypants: true,
  }),
};

class MarkdownRenderer extends Component {
  render() {
    const { text } = this.props;
    return !_.isEmpty(text) ? <Interweave content={ kramed(text, options) } /> : null;
  }
}

MarkdownRenderer.propTypes = {
  text: PropTypes.string,
};
export default MarkdownRenderer;
