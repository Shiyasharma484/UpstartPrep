const actions = {
    FILTER_CUSTOMERSLIST_BEGIN: 'FILTER_CUSTOMERSLIST_BEGIN',
    FILTER_CUSTOMERSLIST_SUCCESS: 'FILTER_CUSTOMERSLIST_SUCCESS',
    FILTER_CUSTOMERSLIST_ERR: 'FILTER_CUSTOMERSLIST_ERR',
  
    filterCustomersListBegin: () => {
      return {
        type: actions.FILTER_CUSTOMERSLIST_BEGIN,
      };
    },
  
    filterCustomersListSuccess: data => {
      return {
        type: actions.FILTER_CUSTOMERSLIST_SUCCESS,
        data,
      };
    },
  
    filterCustomersListErr: err => {
      return {
        type: actions.FILTER_CUSTOMERSLIST_ERR,
        err,
      };
    },
  };
  
  export default actions;
  