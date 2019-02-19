import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_ERROR,
    FETCH_POSTS_SUCCESS
 } from '../constants/action-types';
import { fetch } from "whatwg-fetch";

export const fetchPosts = () => async dispatch => {
    try {
		dispatch({
			type: FETCH_POSTS_REQUEST,
			isFetching: true
		})
        const response = await fetch('http://localhost:3000/api/v1/posts/retrieve', {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            },
                            mode: "cors"
						});
		const responseBody = await response.json();
		dispatch({
			type: FETCH_POSTS_SUCCESS,
			posts: responseBody
		})
	} catch(error) {
		console.log(error)
		dispatch({
			type: FETCH_POSTS_ERROR,
			error: error
		})
    }
}