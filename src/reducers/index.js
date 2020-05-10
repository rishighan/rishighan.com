import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import postsReducers from './post.reducers';
import userReducers from './user.reducers';

export default history => combineReducers({
  router: connectRouter(history),
  posts: postsReducers,
  user: userReducers,
});
