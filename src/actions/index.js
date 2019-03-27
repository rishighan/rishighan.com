import axios from 'axios';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
} from '../constants/action-types';

// sample options obj
/*
  options = {
    callType: string,
    callURIAction: 'findByTagName',
    // for findByTagName
    callParams: {
      tagName: 'Blog',
      pageOffset: 1,
      pageLimit: 10
    }

  }

*/
export const fetchPosts = (options) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_POSTS_REQUEST,
      isFetching: true,
    });
    const serviceURI = 'http://localhost:3000/api/v1/posts/findByTagName';
    const response = await axios.get(serviceURI, {
      method: 'get',
      params: {
        tagName: 'Blog',
        pageOffset: 1,
        pageLimit: 20,
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
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
