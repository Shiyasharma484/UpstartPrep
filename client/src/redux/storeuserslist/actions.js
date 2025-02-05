const actions = {
  FILTER_STOREUSERSLIST_BEGIN: 'FILTER_STOREUSERSLIST_BEGIN',
  FILTER_STOREUSERSLIST_SUCCESS: 'FILTER_STOREUSERSLIST_SUCCESS',
  FILTER_STOREUSERSLIST_ERR: 'FILTER_STOREUSERSLIST_ERR',

  filterStoreUsersListBegin: () => {
    return {
      type: actions.FILTER_STOREUSERSLIST_BEGIN,
    };
  },

  filterStoreUsersListSuccess: data => {
    return {
      type: actions.FILTER_STOREUSERSLIST_SUCCESS,
      data,
    };
  },

  filterStoreUsersListErr: err => {
    return {
      type: actions.FILTER_STOREUSERSLIST_ERR,
      err,
    };
  },
};

export default actions;
