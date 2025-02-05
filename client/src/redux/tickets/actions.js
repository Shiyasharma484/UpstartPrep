const actions = {
    FILTER_TICKETS_BEGIN: 'FILTER_TICKETS_BEGIN',
    FILTER_TICKETS_SUCCESS: 'FILTER_TICKETS_SUCCESS',
    FILTER_TICKETS_ERR: 'FILTER_TICKETS_ERR',
  
    filterTicketsBegin: () => {
      return {
        type: actions.FILTER_TICKETS_BEGIN,
      };
    },
  
    filterTicketsSuccess: data => {
      return {
        type: actions.FILTER_TICKETS_SUCCESS,
        data,
      };
    },
  
    filterTicketsErr: err => {
      return {
        type: actions.FILTER_TICKETS_ERR,
        err,
      };
    },
  };
  
  export default actions;
  