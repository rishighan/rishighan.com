import { LOAD_POSTS } from '../constants/action-types';

const initialState = {
    posts: []
};

function rootReducer(state = initialState, action) {
    if(action.type === LOAD_POSTS){ 
        Object.assign(state, {
            posts: state.posts.concat(action.payload)
        })
    }
    return state;
}

export default rootReducer;