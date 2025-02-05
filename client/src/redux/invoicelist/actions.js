const actions = {
    FILTER_INVOICELIST_BEGIN: 'FILTER_INVOICELIST_BEGIN',
    FILTER_INVOICELIST_SUCCESS: 'FILTER_INVOICELIST_SUCCESS',
    FILTER_INVOICELIST_ERR: 'FILTER_INVOICELIST_ERR',
  
    filterInvoiceListBegin: () => {
      return {
        type: actions.FILTER_INVOICELIST_BEGIN,
      };
    },
  
    filterInvoiceListSuccess: data => {
      return {
        type: actions.FILTER_INVOICELIST_SUCCESS,
        data,
      };
    },
  
    filterInvoiceListErr: err => {
      return {
        type: actions.FILTER_INVOICELIST_ERR,
        err,
      };
    },
  };
  
  export default actions;
  