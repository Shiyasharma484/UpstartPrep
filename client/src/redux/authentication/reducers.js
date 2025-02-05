//import Cookies from 'js-cookie';
import actions from './actions';
const { encrypt, decrypt } = require('../../helpers/encryption-decryption');
import Cookies from 'js-cookie';

const {
  // ALREADYLOGGEDIN_BEGIN,
  // ALREADYLOGGEDIN_SUCCESS,
  // ALREADYLOGGEDIN_ERR,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_UNSUCCESSFULL,
  LOGIN_ERR,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_ERR,
} = actions;

// console.log(Cookies.get('logedIn'));
var chk = false;

const access_token_cookie = Cookies.get('access_token');
if (access_token_cookie) {
  console.log(access_token_cookie);
  chk = true;
}
//console.log(access_token_cookie);

const initState = {
  //login: Cookies.get('logedIn'),
  login: chk,
  loading: false,
  error: null,
  message: null,
  resp: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
  const { type, data, data2, err, message } = action;
  switch (type) {
    // case ALREADYLOGGEDIN_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case ALREADYLOGGEDIN_SUCCESS:
    //   return {
    //     ...state,
    //     login: data,
    //     loading: false,
    //   };
    // case ALREADYLOGGEDIN_ERR:
    //   return {
    //     ...state,
    //     error: err,
    //     loading: false,
    //   };
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: data,
        resp: data2,
        loading: false,
        message: null,
      };
    case LOGIN_UNSUCCESSFULL:
      return {
        ...state,
        login: data,
        loading: false,
        message,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: data, //null
        loading: false,
        resp: data,
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default AuthReducer;
