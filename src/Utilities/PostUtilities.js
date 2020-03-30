import Axios from 'axios';

import env from './env.js';

let {API_URL} = env;
let paginatedPostsEndpoint = "/post/get/paginated?page=";
let postCountEndpoint = '/post/count';

export const getPaginatedPosts = (page = 0) => {
    if(page === "") {
      page = 0;
    }
    return sendGet(API_URL + paginatedPostsEndpoint + page)
}

export const getPostCount = () => {
  return sendGet(API_URL + postCountEndpoint);
}

export const sendGet = async (path, options) => {
    return Axios.get(path, options)
      .catch(err => {
        return {"error": err.response, "success": false}
      });
  }
  
  const sendPut = async (path, data, options) => {
    return Axios.put(path, data, options)
      .catch(err => {
        return {"error": err.response, "success": false}
      });
  }
  
  export const sendPost = async (path, data, headers) => {
    return await Axios.post(path, data, headers)
      .catch(err => {
        return {"error" : err.response, "success": false}
      })
  }
  
  const sendDelete = async (path, options) => {
    return await Axios.delete(path, options)
      .catch(err => {
        return {"error" : err.response, "success": false}
      })
  }