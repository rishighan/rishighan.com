import { PureComponent } from "react";
import kramed from "kramed";
import renderHTML from "react-render-html";
import hljs from "highlight.js";
import "highlight.js/styles/obsidian.css";
import _ from "lodash";

kramed.setOptions({
    highlight: (code, language) => language 
        ? hljs.highlight(language, code).value
        : hljs.highlightAuto(code).value,
    gfm: true,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
});

class MarkdownRenderer extends PureComponent {
    static defaultProps = {
        text: null,
    }

    render() {
        const { text } = this.props;
        return !_.isNull(text) ? renderHTML(kramed(text)) : null;
    }
}

export default MarkdownRenderer