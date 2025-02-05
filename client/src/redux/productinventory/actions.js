const actions = {
    FILTER_PRODUCTINVENTORY_BEGIN: 'FILTER_PRODUCTINVENTORY_BEGIN',
    FILTER_PRODUCTINVENTORY_SUCCESS: 'FILTER_PRODUCTINVENTORY_SUCCESS',
    FILTER_PRODUCTINVENTORY_ERR: 'FILTER_PRODUCTINVENTORY_ERR',
  
    filterProductInventoryBegin: () => {
      return {
        type: actions.FILTER_PRODUCTINVENTORY_BEGIN,
      };
    },
  
    filterProductInventorySuccess: data => {
      return {
        type: actions.FILTER_PRODUCTINVENTORY_SUCCESS,
        data,
      };
    },
  
    filterProductInventoryErr: err => {
      return {
        type: actions.FILTER_PRODUCTINVENTORY_ERR,
        err,
      };
    },
  };
  
  export default actions;
  