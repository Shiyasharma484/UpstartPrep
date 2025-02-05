const actions = {
  // ALREADYLOGGEDIN_BEGIN: 'ALREADYLOGGEDIN_BEGIN',
  // ALREADYLOGGEDIN_SUCCESS: 'ALREADYLOGGEDIN_SUCCESS',
  // ALREADYLOGGEDIN_ERR: 'ALREADYLOGGEDIN_ERR',

  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_UNSUCCESSFULL: 'LOGIN_UNSUCCESSFULL',
  LOGIN_ERR: 'LOGIN_ERR',

  LOGOUT_BEGIN: 'LOGOUT_BEGIN',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERR: 'LOGOUT_ERR',

  // alreadyloggedinBegin: () => {
  //   return {
  //     type: actions.ALREADYLOGGEDIN_BEGIN,
  //   };
  // },

  // alreadyloggedinSuccess: data => {
  //   return {
  //     type: actions.ALREADYLOGGEDIN_SUCCESS,
  //     data,
  //   };
  // },

  // alreadyloggedinErr: err => {
  //   return {
  //     type: actions.ALREADYLOGGEDIN_ERR,
  //     err,
  //   };
  // },

  loginBegin: () => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },

  loginSuccess: (data, data2) => {
    return {
      type: actions.LOGIN_SUCCESS,
      data, //true
      data2, //response
    };
  },

  loginUnSuccessfull: data => {
    //console.log(data);
    return {
      type: actions.LOGIN_UNSUCCESSFULL,
      data, //false
      message: 'Invalid Credentials',
    };
  },

  loginErr: err => {
    return {
      type: actions.LOGIN_ERR,
      err,
    };
  },

  logoutBegin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },

  logoutSuccess: data => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data, //null
    };
  },

  logoutErr: err => {
    return {
      type: actions.LOGOUT_ERR,
      err,
    };
  },
};

export default actions;
