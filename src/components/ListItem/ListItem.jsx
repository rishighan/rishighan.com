import React from "react";
import _ from "lodash";

const ListItem = (props) => {
    return( 
        <ul>
            {props.data.posts.map((post, idx) => 
                <li key={ idx }>
                    { post.title }
                </li>
            )} 
        </ul>
    )
}

export default ListItem;
