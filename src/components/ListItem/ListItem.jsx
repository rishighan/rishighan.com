import React from "react";
import _ from "lodash";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";

const ListItem = (props) => (
    <div className="column is-half-desktop is-three-quarters-mobile">
        {props.data.posts.map((post, idx) => 
            <div key={ idx }>
                <h2>{ post.title }</h2>
                <div><MarkdownRenderer text={ post.content }/></div>
            </div>
        )}
    </div>)

export default ListItem;
