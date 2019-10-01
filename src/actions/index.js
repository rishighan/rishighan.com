import axios from 'axios';
import FormData from 'form-data';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
} from '../constants/action-types';

const postsServiceBaseURI = 'http://localhost:3000/api/v1/posts/';
const assetsServiceBaseURI = 'http://localhost:4000/upload/';

export const fetchPosts = options => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_POSTS_REQUEST,
      isFetching: true,
    });
    const serviceURI = postsServiceBaseURI + options.callURIAction;
    const response = await axios(serviceURI, {
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
    console.log(error);
    dispatch({
      type: FETCH_POSTS_ERROR,
      error,
    });
  }
};

export const onDroppedFile = async (file) => {
  try {
    const fd = new FormData();
    fd.append('fileData', file[0]);
    fd.append('fileName', file[0].name);
    const response = await axios.post(
      assetsServiceBaseURI, fd, {
        headers: {
          'Content-Type': `multipart/form-data boundary=${fd._boundary}`,
        },
      });
    return response;
  } catch (error) {
    return error;
  }
};
