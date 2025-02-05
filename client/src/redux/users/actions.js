const actions = {
  FILTER_USERSLIST_BEGIN: 'FILTER_USERSLIST_BEGIN',
  FILTER_USERSLIST_SUCCESS: 'FILTER_USERSLIST_SUCCESS',
  FILTER_USERSLIST_ERR: 'FILTER_USERSLIST_ERR',

  USERSLIST_BEGIN: 'USERSLIST_BEGIN',
  USERSLIST_SUCCESS: 'USERSLIST_SUCCESS',
  USERSLIST_ERR: 'USERSLIST_ERR',

  // FORM_BEGIN: 'FORM_BEGIN',
  // CHECKEMAILPOHONE_BEGIN: 'CHECKEMAILPOHONE_BEGIN',
  // CHECKEMAILPOHONE_SUCCESS: 'CHECKEMAILPOHONE_SUCCESS',

  ADDUSER_BEGIN: 'ADDUSER_BEGIN',
  ADDUSER_SUCCESS: 'ADDUSER_SUCCESS',
  ADDUSER_ERR: 'ADDUSER_ERR',

  USERDATA_BEGIN: 'USERDATA_BEGIN',
  USERDATA_SUCCESS: 'USERDATA_SUCCESS',
  USERDATA_ERR: 'USERDATA_ERR',
  //
  //ADD USER STARTS FINALLY===========================================================
  //form1 starts____________________________________________
  // formBegin: () => {
  //   return {
  //     type: actions.FORM_BEGIN,
  //   };
  // },

  // checkPhoneEmailAlreadyBegin: () => {
  //   // console.log('in actionpage');
  //   return {
  //     type: actions.CHECKEMAILPOHONE_BEGIN,
  //   };
  // },
  // checkPhoneEmailAlreadySuccess: dataFormR => {
  //   console.log('in actionpage');
  //   return {
  //     type: actions.CHECKEMAILPOHONE_SUCCESS,
  //     status: 'itsnewuser',
  //     dataFormR,
  //   };
  // },
  //form1 ends______________________________________________
  //form2 starts-----------------------------------------------------
  adduserBegin: dataFormR => {
    return {
      type: actions.ADDUSER_BEGIN,
      dataFormR,
    };
  },
  adduserSuccess: () => {
    return {
      type: actions.ADDUSER_SUCCESS,
      message: 'User Created Successfully',
      status: 'success',
    };
  },
  adduserErr: err => {
    return {
      type: actions.ADDUSER_ERR,
      err,
    };
  },
  //form2 ends-----------------------------------------------------------
  //ADD USER ENDS FINALLY===========================================================
  //get users for userlist-STARTS---------------------------------------
  usersListBegin: () => {
    return {
      type: actions.USERSLIST_BEGIN,
    };
  },

  usersListSuccess: data => {
    return {
      type: actions.USERSLIST_SUCCESS,
      data,
    };
  },

  usersListErr: err => {
    return {
      type: actions.USERSLIST_ERR,
      err,
    };
  },
  //get users for userlist-ENDS-----------------------------------------
  //get user by id-STARTS=================================================
  userDataBegin: () => {
    return {
      type: actions.USERDATA_BEGIN,
    };
  },
  userDataSuccess: () => {
    return {
      type: actions.USERDATA_SUCCESS,
    };
  },
  userDataErr: err => {
    return {
      type: actions.USERDATA_ERR,
      err,
    };
  },
  //get user by id-ENDS==================================================
  //
  filterUsersListBegin: () => {
    return {
      type: actions.FILTER_USERSLIST_BEGIN,
    };
  },

  filterUsersListSuccess: data => {
    return {
      type: actions.FILTER_USERSLIST_SUCCESS,
      data,
    };
  },

  filterUsersListErr: err => {
    return {
      type: actions.FILTER_USERSLIST_ERR,
      err,
    };
  },
};
//
export default actions;
