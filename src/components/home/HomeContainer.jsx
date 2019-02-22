import React, { Component } from 'react';
import { connect } from "react-redux";
import ListItem from "../ListItem/ListItem";
import { fetchPosts } from "../../actions/index";
import "bulma/css/bulma.css";

class HomeContainer extends Component {
    componentDidMount() {
		this.props.fetchPosts();
    }
    render() {
		return (!_.isEmpty(this.props.posts) && 
			<div className="columns is-desktop">
	   			<ListItem 
			   	    data={ this.props.posts } />
			</div>)
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