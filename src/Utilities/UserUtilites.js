import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL} = env;
let getUserRoleEndpoint = "/user/get/role";

export const getUserRole = () => {
    return sendGet(API_URL + getUserRoleEndpoint);
  }

