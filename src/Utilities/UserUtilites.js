import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL} = env;
let getUserRoleEndpoint = "/user/get/role";
let sendUserLoginEndpoint = "/user/login";
let sendResetPasswordRequestEndpoint = "/user/password/request/reset";
let sendResetPasswordEndpoint = "/user/password/reset"

export const getUserRole = () => {
  return sendGet(API_URL + getUserRoleEndpoint);
}

export const sendLoginRequest = (data) => {
  return sendPost(API_URL + sendUserLoginEndpoint + "?email=" + data.email + "&password=" + data.password);
}

export const sendResetPasswordRequest = (data) => {
  return sendPost(API_URL + sendResetPasswordRequestEndpoint + "?email=" + data.email);
}

export const sendResetPassword = (data) => {
  return sendPost(API_URL + sendResetPasswordEndpoint + `?email=${data.email}&password=${data.password}&token=${data.token}`)
}

