import { LOCATION_CHANGE } from 'connected-react-router';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  FETCH_STATISTICS_SUCCESS,
} from '../constants/action-types';

const initialState = {
  posts: [],
  isFetching: false,
  error: undefined,
  statistics: [],
};
function postsReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        posts: [],
      };
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.posts,
      };
    case FETCH_STATISTICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        statistics: action.statistics,
      };
    default:
      return state;
  }
}

export default postsReducer;
