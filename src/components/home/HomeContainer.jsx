import React, { Component } from 'react';
import { connect } from "react-redux";
import { List } from "../List/List";
import { fetchPosts } from "../../actions/index";

class HomeContainer extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    render() {
            return (this.props.posts.length !==0 && <List data={ this.props.posts } />)
    }
}
function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: function(){
            dispatch(fetchPosts());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer); 