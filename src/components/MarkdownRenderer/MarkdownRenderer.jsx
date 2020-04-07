import React, { Component } from 'react';
import hljs from 'highlight.js';
import Interweave from 'interweave';
import PropTypes from 'prop-types';
import 'highlight.js/styles/kimbie.dark.css';
import _ from 'lodash';

const md = require('markdown-it')({
  html: true,
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: false, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-',
  linkify: false,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  },
})
  .use(require('markdown-it-footnote'));

// Todo: footnote references will not work if multiple posts with footnotes
//       are displayed on the same page
md.renderer.rules.footnote_caption = (tokens, idx/* , options, env, slf */) => {
  let n = Number(tokens[idx].meta.id + 1).toString();
  if (tokens[idx].meta.subId > 0) {
    n += `:${tokens[idx].meta.subId}`;
  }
  return n;
};


class MarkdownRenderer extends Component {
  render() {
    const { text } = this.props;
    return !_.isEmpty(text) ? (<Interweave content={md.render(text)} />) : null;
  }
}

MarkdownRenderer.propTypes = {
  text: PropTypes.string,
};
export default MarkdownRenderer;