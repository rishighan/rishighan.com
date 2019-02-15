import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_ERROR,
    FETCH_POSTS_SUCCESS
} from "../constants/action-types"

const initialState = {
    posts: [],
    isFetching: false,
    error: undefined
};

function postsReducer(state = initialState, action) {
   switch(action.type) {
        case FETCH_POSTS_REQUEST: 
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_POSTS_ERROR:
            return Object.assign({}, state, {
                isFetching: false, 
                error: action.error
            });
        case FETCH_POSTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                posts: action.posts
            });
        default:
            return state; 
   } 
}

export default postsReducer; 