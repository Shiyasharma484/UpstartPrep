const actions = {
    FILTER_TRANSACTION_BEGIN: 'FILTER_TRANSACTION_BEGIN',
    FILTER_TRANSACTION_SUCCESS: 'FILTER_TRANSACTION_SUCCESS',
    FILTER_TRANSACTION_ERR: 'FILTER_TRANSACTION_ERR',
  
    filterTransactionBegin: () => {
      return {
        type: actions.FILTER_TRANSACTION_BEGIN,
      };
    },
  
    filterTransactionSuccess: data => {
      return {
        type: actions.FILTER_TRANSACTION_SUCCESS,
        data,
      };
    },
  
    filterTransactionErr: err => {
      return {
        type: actions.FILTER_TRANSACTION_ERR,
        err,
      };
    },
  };
  
  export default actions;
  