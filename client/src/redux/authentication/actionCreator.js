//import Cookies from 'js-cookie';
import actions from './actions';
import Axios from 'axios';
import { headers } from '../../helpers/variables';
//import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
//const cookies = new Cookies();
import Cookies from 'js-cookie';
import { notification } from 'antd';
const { encrypt, decrypt } = require('../../helpers/encryption-decryption');

var userDetail;
var accesstoken;
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const {
  // alreadyloggedinBegin,
  // alreadyloggedinSuccess,
  // alreadyloggedinErr,
  loginBegin,
  loginSuccess,
  loginUnSuccessfull,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
} = actions;

const login = postData => {
  //console.log('Inside Action Creator making req to node');
  // const history = useHistory();
  return async dispatch => {
    try {
      dispatch(loginBegin());

      // console.log(headers);
      // console.log(postData);
      await Axios.post(domainpath + '/user/login', postData, { headers }).then(async response => {
        userDetail = response?.data;
        accesstoken = response?.data?.sessdata?.access_token;
        const enc_userdetial = await encrypt(userDetail);

        if (response.status === 200) {
          // console.log('200 Correct Credentials');
          Cookies.set('UserDetail', enc_userdetial);
          Cookies.set('access_token', accesstoken);

          const user_got = response?.data.sessdata.user;

          if (user_got.length > 0) {
            setTimeout(() => {
              // history.push('/dashboard');
              return dispatch(loginSuccess(true, response));
            }, 100);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 110);
          } else {
            const access_token = Cookies.get('access_token');
            //console.log(access_token);
            const headers = {
              'Content-Type': 'application/json; charset=UTF-8',
              token: 'Bearer ' + access_token,
              //token: [access_token],
              device_id: '',
              api_version: '',
              browser: '',
              device_type: '',
            };
            //  console.log(headers);
            //headers from variables was containing empty token so doing this------ENDS
            Axios.get(domainpath + '/user/logout', { headers }).then(response => {
              // console.log(response);
              if (response.status === 200) {
                // Cookies.remove('logedIn');
                // console.log('action creator-LOGOUT session destroyed');
                Cookies.remove('UserDetail');
                Cookies.remove('access_token');
                sessionStorage.clear();
                history.push('/');
              }

              return dispatch(loginUnSuccessfull(false));
            });
          }
          // else if (user_got && user_got.length > 0) {
          //   console.log('lllllllllllllllllllllllll');
          //   const len = store_got?.length;
          //   console.log(len);
          //   if (len == 1) {
          //     console.log('lllllllllllllllllllllllll1111');

          //     if (response.data.sessdata.store[0].permissions == 'Error') {
          //       console.log('Contact Administrator -- Permissions Error');
          //       notification.error({
          //         message: 'Contact Administrator -- Permissions Error',
          //       });
          //       console.log('Doing Logout');
          //       //headers from variables was containing empty token so doing this------STARTS
          //       const access_token = Cookies.get('access_token');
          //       //console.log(access_token);
          //       const headers = {
          //         'Content-Type': 'application/json; charset=UTF-8',
          //         //token: 'Bearer ' + access_token,
          //         token: [access_token],
          //         device_id: '',
          //         api_version: '',
          //         browser: '',
          //         device_type: '',
          //       };
          //       console.log(headers);
          //       //headers from variables was containing empty token so doing this------ENDS
          //       Axios.get(domainpath + '/user/logout', { headers }).then(response => {
          //         console.log(response);
          //         if (response.status === 200) {
          //           // Cookies.remove('logedIn');
          //           console.log('action creator-LOGOUT session destroyed');
          //           Cookies.remove('UserDetail');
          //           Cookies.remove('access_token');
          //           sessionStorage.clear();
          //           history.push('/');
          //         }
          //         //cookies.remove('UserDetail');
          //         //cookies.remove('access_token');

          //         return dispatch(loginUnSuccessfull(false));
          //       });
          //     } else {
          //       return dispatch(loginSuccess(true, response));
          //     }
          //     // history.push(`../users/edit-users-role/${postID}`);
          //   } else {
          //     console.log('lllllllllllllllllllllllll2222');

          //     stores?.map(item => {
          //       //   console.log(item);
          //       console.log(headers);
          //       if (item.store_id == currentdS_ID) {
          //         console.log(item);

          //         if (item.permissions == 'Error') {
          //           //headers from variables was containing empty token so doing this------STARTS
          //           const access_token = Cookies.get('access_token');
          //           //console.log(access_token);
          //           const headers = {
          //             'Content-Type': 'application/json; charset=UTF-8',
          //             //token: 'Bearer ' + access_token,
          //             token: [access_token],
          //             device_id: '',
          //             api_version: '',
          //             browser: '',
          //             device_type: '',
          //           };
          //           console.log(headers);
          //           //headers from variables was containing empty token so doing this------ENDS
          //           Axios.get(domainpath + '/user/logout', { headers }).then(response => {
          //             console.log(response);
          //             if (response.status === 200) {
          //               // Cookies.remove('logedIn');
          //               console.log('action creator-LOGOUT session destroyed');
          //               Cookies.remove('UserDetail');
          //               Cookies.remove('access_token');
          //               sessionStorage.clear();
          //               history.push('/');
          //             }

          //             return dispatch(loginUnSuccessfull(false));
          //           });
          //         } else {
          //           return dispatch(loginSuccess(true, response));
          //         }
          //       } else {
          //         return dispatch(loginSuccess(true, response));
          //       }
          //     });
          //   }
          // }

          //
          setTimeout(() => {
            //console.log(Cookies.get('sid'));
            // Cookies.set('logedIn', true);
            //  return dispatch(loginSuccess(true, response));
          }, 100);
        } else if (response.status === 203) {
          //console.log('credentials incorrect');
          // Cookies.set('logedIn', false);
          return dispatch(loginUnSuccessfull(false));
        }
      });
    } catch (err) {
      // Cookies.set('logedIn', false);
      dispatch(loginErr(err));
    }
  };
};

const logOut = () => {
  Cookies.remove('UserDetail');
  Cookies.remove('access_token');
  Cookies.remove('ChildByParent');
  Cookies.remove('LoginAsChild');
  Cookies.remove('SuperAdminDetails');
  sessionStorage.clear();
  window.location.reload();

  return async dispatch => {
    //console.log('inside logout action creator react');
    //const history = useHistory(); //for redirects in page
    try {
      dispatch(logoutBegin());
      //Cookies.remove('access_token');

      //headers from variables was containing empty token so doing this------STARTS
      const access_token = Cookies.get('access_token');

      const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        //token: 'Bearer ' + access_token,
        token: access_token,
        device_id: '',
        api_version: '',
        browser: '',
        device_type: '',
      };

      //headers from variables was containing empty token so doing this------ENDS
      Axios.get(domainpath + '/user/logout', { headers }).then(response => {
        // console.log('action creator-LOGOUT session destroyed');
        Cookies.remove('UserDetail');
        Cookies.remove('access_token');
        sessionStorage.clear();
        dispatch(logoutSuccess(null));
        // windows.location.reload();
        //false
        //history.push('/');
      });
    } catch (err) {
      Cookies.remove('UserDetail');
      Cookies.remove('access_token');
      sessionStorage.clear();
      // windows.location.reload();
      dispatch(logoutSuccess(null));
    }
  };
};
export {
  login,
  logOut,
  // alreadyloggedin
};
