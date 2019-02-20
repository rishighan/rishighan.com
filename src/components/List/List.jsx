import React from "react";
import _ from "lodash";

const List = (props) => {
    console.log(props.data)
    return( 
        <ul>
            {props.data.map((post, idx) => 
                <li key={ idx }>
                    { post.slug }
                </li>
            )}
        </ul>
    );
}

export default List;
