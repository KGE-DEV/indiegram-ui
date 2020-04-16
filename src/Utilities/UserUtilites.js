import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL, HOME_URL} = env;
let getUserRoleEndpoint = "/user/get/role";
let sendUserLoginEndpoint = "/user/login";
let sendResetPasswordEndpoint = "/wp/wp-admin/admin-ajax.php";

export const getUserRole = () => {
  return sendGet(API_URL + getUserRoleEndpoint);
}

export const sendLoginRequest = (data) => {
  return sendPost(API_URL + sendUserLoginEndpoint + "?email=" + data.email + "&password=" + data.password);
}

export const sendResetPasswordRequest = (data) => {
  return {data: {
    success: true
  }}
  let formData = new FormData();
  formData.append("email", data.email);
  return sendPost(HOME_URL + sendResetPasswordEndpoint + "?action=" + data.action, formData);
}

