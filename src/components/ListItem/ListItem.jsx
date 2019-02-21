import React from "react";
import _ from "lodash";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";

const ListItem = (props) => (
    <ul>
        {props.data.posts.map((post, idx) => 
            <li key={idx}>
                <h3>{ post.title }</h3>
                <div><MarkdownRenderer text={ post.content }/></div>
            </li>
        )}
    </ul>)

export default ListItem;
