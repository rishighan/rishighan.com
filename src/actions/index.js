import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_ERROR,
    FETCH_POSTS_SUCCESS
 } from '../constants/action-types';
import fetch from "whatwg-fetch";

export function fetchPosts(payload) {
    return function(dispatch) {
        dispatch({
            type: FETCH_POSTS_REQUEST,
        });
        return fetch('http://localhost:3000/api/v1/posts/retrieve', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .catch((error) => {
            if(error) {
                dispatch({
                    type: FETCH_POSTS_ERROR,
                    error: error
                })
            } else {
                dispatch({
                    type: FETCH_POSTS_SUCCESS,
                    posts: response
                });
            }
        });
    }
}