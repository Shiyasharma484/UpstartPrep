const actions = {
    FILTER_PRODUCTLIST_BEGIN: 'FILTER_PRODUCTLIST_BEGIN',
    FILTER_PRODUCTLIST_SUCCESS: 'FILTER_PRODUCTLIST_SUCCESS',
    FILTER_PRODUCTLIST_ERR: 'FILTER_PRODUCTLIST_ERR',
  
    filterProductListBegin: () => {
      return {
        type: actions.FILTER_PRODUCTLIST_BEGIN,
      };
    },
  
    filterProductListSuccess: data => {
      return {
        type: actions.FILTER_PRODUCTLIST_SUCCESS,
        data,
      };
    },
  
    filterProductListErr: err => {
      return {
        type: actions.FILTER_PRODUCTLIST_ERR,
        err,
      };
    },
  };
  
  export default actions;
  