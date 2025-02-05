import React from 'react';
import Cookies from 'js-cookie';

// const HEADERS = {
//   headers: {
//     'Content-Type': 'application/json; charset=UTF-8',
//     token: 'Bearer hjskdhskjdhsjkdhskjdhskjdhskdhskjdhsdjksjhdsjkdsdks',
//   },
// };
const { encrypt, decrypt } = require('../helpers/encryption-decryption');

var access_token = Cookies.get('access_token');
console.log(access_token);
// if (access_token_cookie && access_token_cookie.length > 0) {
//   access_token = decrypt(access_token_cookie);
//   console.log(access_token);
// }
// if (sessionStorage.length > 0) {
//   // var access_token = sessionStorage.getItem('access_token');
//   // console.log(access_token);

//   var enc_access_token = sessionStorage.getItem('access_token');
//   console.log(enc_access_token);

//   var access_token = decrypt(enc_access_token);
//   console.log(access_token);

//   var enc_user_detail = Cookies.get('UserDetail');
//   console.log(enc_user_detail);

//   var UserDetail = decrypt(enc_user_detail);
//   console.log(UserDetail);
// }

const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
  token: access_token,
  //token: 'Bearer OWI5OGJlMjEtOTM3Ni00NGFlLWE3ODYtMTAxNWI0OTliMTYyMmRkZDk5ZmE0NGU1NjhiNGI4MmVmM2MzZjNiZTJmMjI=',
  device_id: '',
  api_version: '',
  browser: '',
  device_type: '',
};

export {
  headers,
  // UserDetail
};

//device_id
//api_version //env file
//browser
//device_type
