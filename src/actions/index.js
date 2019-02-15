import { LOAD_POSTS } from '../constants/action-types';

export function loadPosts(payload) {
    return {
        type: LOAD_POSTS,
        payload
    }
}