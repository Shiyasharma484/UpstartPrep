const actions = {
    FILTER_CATEGORY_BEGIN: 'FILTER_CATEGORY_BEGIN',
    FILTER_CATEGORY_SUCCESS: 'FILTER_CATEGORY_SUCCESS',
    FILTER_CATEGORY_ERR: 'FILTER_CATEGORY_ERR',
  
    filterCategoryBegin: () => {
      return {
        type: actions.FILTER_CATEGORY_BEGIN,
      };
    },
  
    filterCategorySuccess: data => {
      return {
        type: actions.FILTER_CATEGORY_SUCCESS,
        data,
      };
    },
  
    filterCategoryErr: err => {
      return {
        type: actions.FILTER_CATEGORY_ERR,
        err,
      };
    },
  };
  
  export default actions;
  