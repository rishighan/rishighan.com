import React from "react";
import _ from "lodash";

const List = (props) => {
   console.log(props)
    return(
        <ul>
            <li>
           { props.data.map((post) => {
              <span>{ post._id }</span>
           })}
           </li>
        </ul>
    );
}

export default List;