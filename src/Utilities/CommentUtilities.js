import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL} = env;
let getCommentsPreviewEndpoint = "/comment/get/preview?post_id=";
let postCommentEndpoint = "/comment/add";

export const getCommentsPreview = (post_id) => {
    return sendGet(API_URL + getCommentsPreviewEndpoint + post_id)
}

export const postComment = (commentData) => {
    let headers = { 'Content-Type': '"application/json"' }
    return sendPost(API_URL + postCommentEndpoint, commentData, headers);
}