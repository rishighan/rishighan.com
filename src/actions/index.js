import axios from 'axios';
import FormData from 'form-data';
import {
  CREATE_POST_SUCCESS,
  FETCH_POSTS_REQUEST,
  GENERIC_POSTS_API_ERROR,
  FETCH_POSTS_SUCCESS,
  UPDATE_POST_SUCCESS,
  FETCH_STATISTICS_SUCCESS,
  FETCH_DRAFTS_SUCCESS,
  GET_DIFF_HISTORIES_SUCCESS,
  // series
  CREATE_SERIES_SUCCESS,
  CREATE_SERIES_ERROR,
  FETCH_SERIES_SUCCESS,
  UPDATE_SERIES_SUCCESS,
  DELETE_SERIES_SUCCESS,
  FIND_SERIES_BY_POSTID_SUCCESS,
} from '../constants/action-types';
import {
  POSTS_SERVICE_URI,
  ASSETS_SERVICE_URI,
} from '../constants/endpoints';
import qs from 'qs';

// @params {options}
export const postsAPICall = options => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_POSTS_REQUEST,
      inProgress: true,
    });
    const serviceURI = POSTS_SERVICE_URI + options.callURIAction;
    const response = await axios(serviceURI, {
      method: options.callMethod,
      params: options.callParams,
      data: options.data ? options.data : null,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {arrayFormat: 'repeat'});
     },
    });

    switch (options.callURIAction) {
      case 'create':
        dispatch({
          type: CREATE_POST_SUCCESS,
          result: response.data,
        });
        break;
      case 'retrieve':
      case 'findByTagName':
      case 'filterPostsByTags':
      case 'searchPosts':
      case 'retrieveOne':
      case 'getArchivedPosts':
        dispatch({
          type: FETCH_POSTS_SUCCESS,
          posts: response.data,
        });
        break;
      case 'getStatistics':
        dispatch({
          type: FETCH_STATISTICS_SUCCESS,
          statistics: response.data,
        });
        break;
      case 'getDrafts':
        dispatch({
          type: FETCH_DRAFTS_SUCCESS,
          drafts: response.data,
        });
        break;
      case 'update':
        dispatch({
          type: UPDATE_POST_SUCCESS,
          status: response.data,
        });
        break;
      case 'getDiffHistories':
        dispatch({
          type: GET_DIFF_HISTORIES_SUCCESS,
          diffHistories: response.data,
        });
        break;
      case 'createSeries':
        dispatch({
          type: CREATE_SERIES_SUCCESS,
          result,
        });
        break;
      case 'updateSeries':
        dispatch({
          type: UPDATE_SERIES_SUCCESS,
          result,
        });
        break;
      case 'retrieveSeries':
        dispatch({
          type: FETCH_SERIES_SUCCESS,
          result: response.data,
        });
        break;
      case 'deleteSeries':
        dispatch({
          type: DELETE_SERIES_SUCCESS,
          result,
        });
        break;
      case 'findSeriesByPostId':
        dispatch({
          type: FIND_SERIES_BY_POSTID_SUCCESS,
          result: response.data,
        });
        break;
      default:
        console.log('Couldn\'nt complete request');
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GENERIC_POSTS_API_ERROR,
      error,
    });
  }
};

export const assetsAPICall = async (options) => {
  try {
    const fd = new FormData();
    let uploadResponse = {};
    let deleteResponse = {};
    switch (options.callURIAction) {
      case 'upload':
        fd.append('fileData', options.file[0]);
        fd.append('fileName', options.file[0].name);

        uploadResponse = await axios.post(
          ASSETS_SERVICE_URI + options.callURIAction,
          fd,
          {
            headers: {
              'content-type': `multipart/form-data; boundary=${fd._boundary}`,
            },
          },
        );
        return uploadResponse;

      case 'delete':
        deleteResponse = await axios({
          method: options.method,
          url: ASSETS_SERVICE_URI + options.callURIAction,
          params: {
            fileName: options.fileName,
          },
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          data: {},
        });
        return deleteResponse;
      default:
        return false;
    }
  } catch (error) {
    return error;
  }
};
