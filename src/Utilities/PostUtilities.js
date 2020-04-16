import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL} = env;
let paginatedPostsEndpoint = "/post/get/paginated/";
let postCountEndpoint = "/post/count";
let createPostEndpoint = "/post/add";

export const getPaginatedPosts = (page = 0) => {
    if(page === "") {
      page = 0;
    }
    return sendGet(API_URL + paginatedPostsEndpoint + page)
}

export const getPostCount = () => {
  return sendGet(API_URL + postCountEndpoint);
}

export const createPost = (data) => {
  let formData = new FormData();
  formData.append("caption", data.caption);
  formData.append("file", data.file);
  formData.append("name", data.name);
  formData.append("type", data.type);
  return sendPost(API_URL + createPostEndpoint, formData);
}
