import { combineReducers } from "redux";
import postsReducers from './post.reducers';

const rootReducer = combineReducers({
    posts: postsReducers
});

export default rootReducer;