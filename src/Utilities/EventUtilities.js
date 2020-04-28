import {sendPost, sendGet} from './DataUtilities.js';

import env from './env.js';

let {API_URL} = env;
let eventEndpoint = "/event";
let eventsByUserEndpoint = "/event/by/user";
let eventsByEventEndpoint = "/event/by/event";
let eventsByLatestEndpoint = "/event/latest";

// Constants 
export const LOGGED_IN_EVENT = "Logged In";
export const PAGE_VIEWED_EVENT = "Page Viewed";
export const COMMENT_ADDED_EVENT = "Comment Added";
export const POST_VIEWED_EVENT = "Post Viewed";
export const SUBMITTED_FORGOT_PASSWORD_EVENT = "Forgot Password";

export const sendUserEvent = (event, meta = null) => {
    let userId = window.localStorage.userId ? window.localStorage.userId : null;
    let data = {
        "userId": userId,
        "event": event,
        "page": window.location.pathname,
        "meta": meta
    }
    return sendPost(API_URL + eventEndpoint, data);
}

export const getEventsByUser = (userId) => {
    return sendGet(API_URL + eventsByUserEndpoint + "?userId=" + userId);
}

export const getEventsByEvent = (event) => {
    return sendGet(API_URL + eventsByEventEndpoint + "?event=" + event);
}

export const getLatestEvents = () => {
    return sendGet(API_URL + eventsByLatestEndpoint);
}