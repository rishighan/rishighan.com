import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_ERROR,
    FETCH_POSTS_SUCCESS
 } from '../constants/action-types';
import axios from "axios";

export const fetchPosts = () => async dispatch => {
    try {
		dispatch({
			type: FETCH_POSTS_REQUEST,
			isFetching: true
		})
		let serviceURI = 'http://localhost:3000/api/v1/posts/findByTagName';
        const response = await axios.get(serviceURI, {
							method: "get",
							params: {
								tagName: "Blog",
								pageOffset: 1,
								pageLimit: 20
							},
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*"
							}
						});
		dispatch({
			type: FETCH_POSTS_SUCCESS,
			posts: response.data
		})
	} catch(error) {
		console.log("Error", error)
		dispatch({
			type: FETCH_POSTS_ERROR,
			error: error
		})
    }
}