import {sendGet, sendPost, sendDelete, sendPut} from './DataUtilities.js';

import env from './env.js';

let {API_URL} = env;
let paginatedPostsEndpoint = "/post/get/paginated/";
let postCountEndpoint = "/post/count";
let createPostEndpoint = "/post/v2/add";
let deletePostEndpoint = "/post/delete";
let editPostEndpoint = "/post/edit";

export const getPaginatedPosts = (page = 0) => {
    if(page === "") {
      page = 0;
    }
    return sendGet(API_URL + paginatedPostsEndpoint + page)
}

export const getPostCount = () => {
  return sendGet(API_URL + postCountEndpoint);
}

export const createPost = (data, reportUploadProgress) => {
  let formData = new FormData();
  let name = data.name.split(' ').join('');
  formData.append("caption", data.caption);
  formData.append("file", data.file);
  formData.append("name", name);
  formData.append("type", data.type);
  formData.append("isPrivate", data.isPrivate);
  return sendPost(API_URL + createPostEndpoint, formData, null, reportUploadProgress);
}

export const deletePost = (postId) => {
  return sendDelete(API_URL + deletePostEndpoint, {postId});
}

export const sendEditPost = (post) => {
  return sendPut(API_URL + editPostEndpoint, post);
}
