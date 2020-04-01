import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL} = env;
let paginatedPostsEndpoint = "/post/get/paginated?page=";
let postCountEndpoint = "/post/count";

export const getPaginatedPosts = (page = 0) => {
    if(page === "") {
      page = 0;
    }
    return sendGet(API_URL + paginatedPostsEndpoint + page)
}

export const getPostCount = () => {
  return sendGet(API_URL + postCountEndpoint);
}
