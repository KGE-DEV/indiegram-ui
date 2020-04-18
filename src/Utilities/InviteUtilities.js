import {sendPost} from './DataUtilities.js';

import env from '../Utilities/env.js';

let {API_URL} = env;
let sendInviteRequestEndpoint = "/user/request/invite";

export const sendInviteRequest = (data) => {
    return sendPost(API_URL + sendInviteRequestEndpoint + data);
}