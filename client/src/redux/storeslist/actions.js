const actions = {
    FILTER_STORESLIST_BEGIN: 'FILTER_STORESLIST_BEGIN',
    FILTER_STORESLIST_SUCCESS: 'FILTER_STORESLIST_SUCCESS',
    FILTER_STORESLIST_ERR: 'FILTER_STORESLIST_ERR',
  
    filterStoresListBegin: () => {
      return {
        type: actions.FILTER_STORESLIST_BEGIN,
      };
    },
  
    filterStoresListSuccess: data => {
      return {
        type: actions.FILTER_STORESLIST_SUCCESS,
        data,
      };
    },
  
    filterStoresListErr: err => {
      return {
        type: actions.FILTER_STORESLIST_ERR,
        err,
      };
    },
  };
  
  export default actions;
  