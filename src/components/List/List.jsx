import React, { Component } from "react";

class List extends React.Component {
    constructor(props) {
        super(props);
        console.log("props", props)
    }

    render() {
        return(
            <ul>
                {this.props.info.posts && this.props.info.posts.map((post) =>{
                    { post.slug }
                }) }
            </ul>
        )
    }
}

export default List;