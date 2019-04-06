import axios from 'axios';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
} from '../constants/action-types';

export const fetchPosts = options => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_POSTS_REQUEST,
      isFetching: true,
    });
    const serviceBaseURI = 'http://localhost:3000/api/v1/posts/';
    const serviceURI = serviceBaseURI + options.callURIAction;
    const response = await axios.get(serviceURI, {
      method: options.callMethod,
      params: options.callParams,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    console.log(response.data)
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      posts: response.data,
    });
  } catch (error) {
    console.log('Error', error);
    dispatch({
      type: FETCH_POSTS_ERROR,
      error,
    });
  }
};

export const fetchOther = () => 'foo';
