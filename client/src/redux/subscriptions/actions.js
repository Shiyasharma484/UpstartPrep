const actions = {
    FILTER_SUBSCRIPTION_BEGIN: 'FILTER_SUBSCRIPTION_BEGIN',
    FILTER_SUBSCRIPTION_SUCCESS: 'FILTER_SUBSCRIPTION_SUCCESS',
    FILTER_SUBSCRIPTION_ERR: 'FILTER_SUBSCRIPTION_ERR',
  
    filterSubscriptionBegin: () => {
      return {
        type: actions.FILTER_SUBSCRIPTION_BEGIN,
      };
    },
  
    filterSubscriptionSuccess: data => {
      return {
        type: actions.FILTER_SUBSCRIPTION_SUCCESS,
        data,
      };
    },
  
    filterSubscriptionErr: err => {
      return {
        type: actions.FILTER_SUBSCRIPTION_ERR,
        err,
      };
    },
  };
  
  export default actions;
  