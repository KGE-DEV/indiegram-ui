import {sendGet, sendPost, sendDelete, sendPut} from './DataUtilities.js';

import env from './env.js';

let {API_URL, SITE_KEY} = env;
let paginatedPostsEndpoint = "/post/get/paginated/";
let individualPostEndpoint = "/post/get/";
let postCountEndpoint = "/post/count";
let createPostEndpointV3 = "/post/v3/add";
let deletePostEndpoint = "/post/delete";
let editPostEndpoint = "/post/edit";
const rotateImageEndpoint = "/post/rotate-image";

export const getPaginatedPosts = (page = 0) => {
    if(page === "") {
      page = 0;
    }
    return sendGet(API_URL + paginatedPostsEndpoint + page + "?siteKey=" + SITE_KEY)
}

export const getIndividualPost = (postId) => {
  return sendGet(API_URL + individualPostEndpoint + postId  + "?siteKey=" + SITE_KEY)
}

export const getPostCount = () => {
  return sendGet(API_URL + postCountEndpoint  + "?siteKey=" + SITE_KEY);
}

export const createPostV2 = (data, reportUploadProgress) => {
  let formData = new FormData();
  formData.append("caption", data.caption);
  data.imgArray.forEach(img => {
    formData.append("file", img.file);
  })
  formData.append("isPrivate", data.isPrivate);
  formData.append("fileData", JSON.stringify(data.imgData));
  formData.append("siteKey", data.isCrossPost ? 'cp' : SITE_KEY);

  return sendPost(API_URL + createPostEndpointV3, formData, null, reportUploadProgress);
}

export const deletePost = (postId) => {
  return sendDelete(API_URL + deletePostEndpoint, {postId});
}

export const sendEditPost = (post) => {
  return sendPut(API_URL + editPostEndpoint, post);
}

export const sendRotateImage = (imgUrl, rotation) => {
  return sendPost(API_URL + rotateImageEndpoint, { imgUrl, rotation }, null);
}
