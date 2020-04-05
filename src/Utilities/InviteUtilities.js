import {sendPost} from './DataUtilities.js';

import env from '../Utilities/env.js';

let homeUrl = env.HOME_URL;
let sendInviteRequestEndpoint = "/wp-admin/admin-ajax.php";

export const sendInviteRequest = (data) => {
    return sendPost(homeUrl + sendInviteRequestEndpoint + data);
}