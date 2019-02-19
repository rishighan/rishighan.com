import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_ERROR,
    FETCH_POSTS_SUCCESS
} from "../constants/action-types"

function postsReducer(state = [], action) {
   switch(action.type) {
        // case FETCH_POSTS_REQUEST: 
        //     return {
        //         ...state,
        //         isFetching: true
        //     } 
        // case FETCH_POSTS_ERROR:
        //     return {
        //         ...state,
        //         isFetching: false, 
        //         error: action.error
        //     }
        case FETCH_POSTS_SUCCESS:
            return action.posts
        default:
            return state; 
   } 
}

export default postsReducer; 