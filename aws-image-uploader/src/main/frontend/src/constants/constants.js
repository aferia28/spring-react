export const GET_PROFILES = "http://localhost:8080/api/v1/user-profile/"
export var UPLOAD_USERPROFILE_IMAGE = (userProfileId) => GET_PROFILES + `${userProfileId}/image/upload`
export var DOWNLOAD_USERPROFILE_IMAGE = (userProfileId) => GET_PROFILES + `${userProfileId}/image/download`
export var GET_PROFILE = (userProfileId) => GET_PROFILES + `${userProfileId}`
export const AUTH0_DOMAIN = "dev-5j8a2az6.us.auth0.com";
export const AUTH0_CLIENTID = "z7tl3VmWgiDMJKEvtJd1bFdr2OANggeT";