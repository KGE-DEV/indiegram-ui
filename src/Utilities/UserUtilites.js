import {sendGet, sendPost} from './DataUtilities.js';

import env from './env.js';

let {API_URL} = env;
let getUserRoleEndpoint = "/user/get/role";
let sendUserLoginEndpoint = "/user/login";
let sendResetPasswordRequestEndpoint = "/user/password/request/reset";
let sendResetPasswordEndpoint = "/user/password/reset";
let getInvitesEndpoint = "/user/invites";
let approveInviteEndpoint = "/user/add";
let getUsersEndpoint = "/user/all";
let editUserEndpoint = "/user/edit";

export const getUserRole = () => {
  return sendGet(API_URL + getUserRoleEndpoint);
}

export const sendLoginRequest = (loginRequest) => {
  let data = JSON.stringify({
    email: loginRequest.email,
    password: loginRequest.password
  })
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    withCredentials: true
  };
  return sendPost(API_URL + sendUserLoginEndpoint, data, axiosConfig);
}

export const sendResetPasswordRequest = (data) => {
  return sendPost(API_URL + sendResetPasswordRequestEndpoint + "?email=" + data.email);
}

export const sendResetPassword = (data) => {
  return sendPost(API_URL + sendResetPasswordEndpoint + `?email=${data.email}&password=${data.password}&token=${data.token}`)
}

export const getInvites = () => {
  return sendGet(API_URL + getInvitesEndpoint);
}

export const approveInvite = (invite) => {
  return sendPost(API_URL + approveInviteEndpoint + `?email=${invite.email}&name=${invite.name}`)
}

export const getUsers = () => {
  return sendGet(API_URL + getUsersEndpoint);
}

export const sendEditUser = (user) => {
  return sendPost(API_URL + editUserEndpoint, user);
}