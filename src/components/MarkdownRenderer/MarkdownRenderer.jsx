import { PureComponent } from "react";
import kramed from "kramed";
import renderHTML from "react-render-html";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import _ from "lodash";

let options = {
    renderer: new kramed.Renderer({
        highlight: code => hljs.highlightAuto(code).value,
        gfm: true,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
      })
};

class MarkdownRenderer extends PureComponent {
    static defaultProps = {
        text: null,
    }

    render() {
        const { text } = this.props;
        return !_.isNull(text) ? renderHTML(kramed(text, options)) : null;
    }
}

export default MarkdownRenderer