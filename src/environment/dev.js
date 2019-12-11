// export const OAUTH2_HOST =  + "/oauth2";
// export const EMPLOYER_HOST = process.env.REACT_APP_API_HOST + "/employers";
// export const PUBLIC_HOST = process.env.REACT_APP_API_HOST + "/public";

export const OAUTH2_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : "http://develop.works.vn:8000/oauth2";
export const EMPLOYER_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : "http://develop.works.vn:8000/employers";
export const PUBLIC_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : "http://develop.works.vn:8000/public";

