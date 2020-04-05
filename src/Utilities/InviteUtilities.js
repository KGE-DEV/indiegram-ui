import {sendPost} from './DataUtilities.js';

import env from '../Utilities/env.js';

let {HOME_URL} = env;
let sendInviteRequestEndpoint = "/wp-admin/admin-ajax.php";

export const sendInviteRequest = (data) => {
    return sendPost(HOME_URL + sendInviteRequestEndpoint + data);
}