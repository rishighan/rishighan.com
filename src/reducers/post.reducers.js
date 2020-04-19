import { LOCATION_CHANGE } from "connected-react-router";
import {
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  FETCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  GENERIC_POSTS_API_ERROR,
  FETCH_POSTS_SUCCESS,
  FETCH_STATISTICS_SUCCESS,
  FETCH_DRAFTS_SUCCESS,
  UPDATE_POST_SUCCESS,
  GET_DIFF_HISTORIES_SUCCESS,
  CREATE_SERIES_SUCCESS,
  FETCH_SERIES_SUCCESS,
  DELETE_SERIES_SUCCESS,
} from "../constants/action-types";

const initialState = {
  posts: [],
  inProgress: false,
  error: undefined,
  statistics: [],
  diffHistories: []
};
function postsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        result: action.result,
      };
    case LOCATION_CHANGE:
      return {
        posts: []
      };
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        inProgress: true
      };
    case GENERIC_POSTS_API_ERROR:
      return {
        ...state,
        inProgress: false,
        error: action.error
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        posts: action.posts
      };
    case SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        posts: action.posts
      };
    case FETCH_STATISTICS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        statistics: action.statistics
      };
    case FETCH_DRAFTS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        drafts: action.drafts
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        status: action.post
      };
    case GET_DIFF_HISTORIES_SUCCESS:
      return {
        ...state,
        inProgress: false,
        diffHistories: action.diffHistories
      };
    case CREATE_SERIES_SUCCESS:
      return {
        ...state,
        inProgress: false,
        result,
      };
    case FETCH_SERIES_SUCCESS:
      return {
        ...state,
        inProgress: false,
        series: action.result.docs,
      };
    case DELETE_SERIES_SUCCESS:
      console.log(action)
      return {
        ...state,
        inProgress: false,
        deleteResult: result,
      };
    default:
      return state;
  }
}

export default postsReducer;
