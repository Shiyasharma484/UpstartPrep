const actions = {
    FILTER_VARIANTSLIST_BEGIN: 'FILTER_VARIANTSLIST_BEGIN',
    FILTER_VARIANTSLIST_SUCCESS: 'FILTER_VARIANTSLIST_SUCCESS',
    FILTER_VARIANTSLIST_ERR: 'FILTER_VARIANTSLIST_ERR',
  
    filterVariantsListBegin: () => {
      return {
        type: actions.FILTER_VARIANTSLIST_BEGIN,
      };
    },
  
    filterVariantsListSuccess: data => {
      return {
        type: actions.FILTER_VARIANTSLIST_SUCCESS,
        data,
      };
    },
  
    filterVariantsListErr: err => {
      return {
        type: actions.FILTER_VARIANTSLIST_ERR,
        err,
      };
    },
  };
  
  export default actions;
  