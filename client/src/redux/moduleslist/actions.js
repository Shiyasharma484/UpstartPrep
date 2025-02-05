const actions = {
    FILTER_MODULESLIST_BEGIN: 'FILTER_MODULESLIST_BEGIN',
    FILTER_MODULESLIST_SUCCESS: 'FILTER_MODULESLIST_SUCCESS',
    FILTER_MODULESLIST_ERR: 'FILTER_MODULESLIST_ERR',
  
    filterModulesListBegin: () => {
      return {
        type: actions.FILTER_MODULESLIST_BEGIN,
      };
    },
  
    filterModulesListSuccess: data => {
      return {
        type: actions.FILTER_MODULESLIST_SUCCESS,
        data,
      };
    },
  
    filterModulesListErr: err => {
      return {
        type: actions.FILTER_MODULESLIST_ERR,
        err,
      };
    },
  };
  
  export default actions;
  