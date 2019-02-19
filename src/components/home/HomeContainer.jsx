import React, { Component } from 'react';
import { connect } from "react-redux";
import List from "../List/List";
import { fetchPosts } from "../../actions/index";

class HomeContainer extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    render() {
        return(
            <List info={ this.props.posts } />            
        )
    }
}

const mapStateToProps = state => {
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