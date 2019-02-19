import React from "react";
import _ from "lodash";

const List = (props) => (
    <ul>
        { props.info.posts.length !== 0 ?
            props.info.posts.map((post) => {
                post.slug
            }) : <h1>null</h1> }
    </ul>
)

export default List;