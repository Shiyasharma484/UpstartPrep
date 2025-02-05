const actions = {
    FILTER_USERSROLE_BEGIN: 'FILTER_USERSROLE_BEGIN',
    FILTER_USERSROLE_SUCCESS: 'FILTER_USERSROLE_SUCCESS',
    FILTER_USERSROLE_ERR: 'FILTER_USERSROLE_ERR',
  
    filterUsersRoleBegin: () => {
      return {
        type: actions.FILTER_USERSROLE_BEGIN,
      };
    },
  
    filterUsersRoleSuccess: data => {
      return {
        type: actions.FILTER_USERSROLE_SUCCESS,
        data,
      };
    },
  
    filterUsersRoleErr: err => {
      return {
        type: actions.FILTER_USERSROLE_ERR,
        err,
      };
    },
  };
  
  export default actions;
  