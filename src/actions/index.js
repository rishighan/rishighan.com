import axios from "axios";
import fetch from "whatwg-fetch";
import FormData from "form-data";
import {
  FETCH_POSTS_REQUEST,
  GENERIC_POSTS_API_ERROR,
  FETCH_POSTS_SUCCESS,
  UPDATE_POST_SUCCESS,
  FETCH_STATISTICS_SUCCESS,
  FETCH_DRAFTS_SUCCESS,
  GET_DIFF_HISTORIES_SUCCESS
} from "../constants/action-types";

// const postsServiceURI = 'http://services.rishighan.com/api/v1/posts/';
const postsServiceURI = "http://localhost/api/v1/posts/";
const assetsServiceURI = "http://localhost/assets/api/upload/";

// @params {options}
export const postsAPICall = options => async dispatch => {
  try {
    dispatch({
      type: FETCH_POSTS_REQUEST,
      inProgress: true
    });
    const serviceURI = postsServiceURI + options.callURIAction;
    const response = await axios(serviceURI, {
      method: options.callMethod,
      params: options.callParams,
      data: options.data ? options.data : null,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

    switch (options.callURIAction) {
      case "getStatistics":
        dispatch({
          type: FETCH_STATISTICS_SUCCESS,
          statistics: response.data
        });
        break;
      case "getDrafts":
        dispatch({
          type: FETCH_DRAFTS_SUCCESS,
          drafts: response.data
        });
        break;
      case "update":
        dispatch({
          type: UPDATE_POST_SUCCESS,
          status: response.data
        });
        break;
      case "getDiffHistories":
        dispatch({
          type: GET_DIFF_HISTORIES_SUCCESS,
          diffHistories: response.data
        });
        break;
      default:
        dispatch({
          type: FETCH_POSTS_SUCCESS,
          posts: response.data
        });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GENERIC_POSTS_API_ERROR,
      error
    });
  }
};

export const onDroppedFile = async file => {
  try {
    const fd = new FormData();
    fd.append("fileData", file[0]);
    fd.append("fileName", file[0].name);

    axios
      .post("http://localhost/assets/api/upload", fd, {
        headers: {
          "content-type": `multipart/form-data; boundary=${fd._boundary}`
        }
      })
      .then(data => {
        console.log(data);
      });
  } catch (error) {
    return error;
  }
};
