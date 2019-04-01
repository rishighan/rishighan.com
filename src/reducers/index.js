import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import postsReducers from './post.reducers';

export default history => combineReducers({
  router: connectRouter(history),
  posts: postsReducers,
});
