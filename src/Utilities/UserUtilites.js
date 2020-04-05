import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL, HOME_URL} = env;
let getUserRoleEndpoint = "/user/get/role";
let sendUserLoginEndpoint = "/wp-admin/admin-ajax.php";

export const getUserRole = () => {
  return sendGet(API_URL + getUserRoleEndpoint);
}

export const sendLoginRequest = (data) => {
  let formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);
  return sendPost(HOME_URL + sendUserLoginEndpoint + "?action=" + data.action, formData);
}

