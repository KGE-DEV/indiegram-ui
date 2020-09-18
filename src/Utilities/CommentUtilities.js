import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL} = env;
let getCommentsEndpoint = "/comment/get/all?post_id=";
let postCommentEndpoint = "/comment/add";

export const getComments = (post_id) => {
    return sendGet(API_URL + getCommentsEndpoint + post_id);
}

export const postComment = (commentData) => {
    let headers = { 'Content-Type': '"application/json"', withCredentials: true }
    return sendPost(API_URL + postCommentEndpoint, commentData, headers);
}