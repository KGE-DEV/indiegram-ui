import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL, HOME_URL} = env;
let paginatedPostsEndpoint = "/post/get/paginated/";
let postCountEndpoint = "/post/count";
let createPostEndpoint = "/wp-admin/admin-ajax.php";

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
  formData.append("image", data.file);
  return sendPost(HOME_URL + createPostEndpoint + "?action=" + data.action, formData);
}
