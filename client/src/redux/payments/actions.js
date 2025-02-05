const actions = {
    FILTER_PAYMENT_BEGIN: 'FILTER_PAYMENT_BEGIN',
    FILTER_PAYMENT_SUCCESS: 'FILTER_PAYMENT_SUCCESS',
    FILTER_PAYMENT_ERR: 'FILTER_PAYMENT_ERR',
  
    filterPaymentBegin: () => {
      return {
        type: actions.FILTER_PAYMENT_BEGIN,
      };
    },
  
    filterPaymentSuccess: data => {
      return {
        type: actions.FILTER_PAYMENT_SUCCESS,
        data,
      };
    },
  
    filterPaymentErr: err => {
      return {
        type: actions.FILTER_PAYMENT_ERR,
        err,
      };
    },
  };
  
  export default actions;
  