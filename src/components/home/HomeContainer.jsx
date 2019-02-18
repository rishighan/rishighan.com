import React, { Component } from 'react';
import { connect } from "react-redux";
import List from "../List/List";
import { fetchPosts } from "../../actions/index";

class ConnectedHomeContainer extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    render() {
        return(
            <List info={ this.props.posts } />            
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: function(){
            dispatch(fetchPosts());
        }
    };
}
const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedHomeContainer); 
export default HomeContainer;