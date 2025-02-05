const actions = {
    FILTER_USERSPERMISSION_BEGIN: 'FILTER_USERSPERMISSION_BEGIN',
    FILTER_USERSPERMISSION_SUCCESS: 'FILTER_USERSPERMISSION_SUCCESS',
    FILTER_USERSPERMISSION_ERR: 'FILTER_USERSPERMISSION_ERR',
  
    filterUsersPermissionBegin: () => {
      return {
        type: actions.FILTER_USERSPERMISSION_BEGIN,
      };
    },
  
    filterUsersPermissionSuccess: data => {
      return {
        type: actions.FILTER_USERSPERMISSION_SUCCESS,
        data,
      };
    },
  
    filterUsersPermissionErr: err => {
      return {
        type: actions.FILTER_USERSPERMISSION_ERR,
        err,
      };
    },
  };
  
  export default actions;
  