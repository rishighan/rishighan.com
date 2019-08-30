import axios from 'axios';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  DROP_FILE,
} from '../constants/action-types';

const postsServiceBaseURI = 'http://localhost:3000/api/v1/posts/';
const assetsServiceBaseURI = 'http://localhost:3030/api/v1/assets/';

export const fetchPosts = options => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_POSTS_REQUEST,
      isFetching: true,
    });
    const serviceURI = postsServiceBaseURI + options.callURIAction;
    const response = await axios.get(serviceURI, {
      method: options.callMethod,
      params: options.callParams,
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

export const onDroppedFile = options => async (dispatch) => {
  try {
    dispatch({
      type: DROP_FILE,
      isUploading: true,
    });
    const serviceURI = assetsServiceBaseURI + options.callURIAction;
    const response = await axios.get(serviceURI, {});
    console.log('reached here');
  } catch (error) {
    console.log('Error', error);
  }
};
