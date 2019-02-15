import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

const ConnectedList = ({ posts }) => (
    <ul>
        { posts.map(post => {
            <li key={ post.id }>
                { post.title }
            </li>
        }) }
    </ul>
)

const List = connect(mapStateToProps)(ConnectedList)

export default List;