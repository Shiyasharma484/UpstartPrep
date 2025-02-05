const actions = {
    FILTER_STORE_BEGIN: 'FILTER_STORE_BEGIN',
    FILTER_STORE_SUCCESS: 'FILTER_STORE_SUCCESS',
    FILTER_STORE_ERR: 'FILTER_STORE_ERR',
  
    filterStoreBegin: () => {
      return {
        type: actions.FILTER_STORE_BEGIN,
      };
    },
  
    filterStoreSuccess: data => {
      return {
        type: actions.FILTER_STORE_SUCCESS,
        data,
      };
    },
  
    filterStoreErr: err => {
      return {
        type: actions.FILTER_STORE_ERR,
        err,
      };
    },
  };
  
  export default actions;
  