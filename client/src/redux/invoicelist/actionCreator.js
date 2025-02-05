import actions from './actions';
import initialState from '../../demoData/invoicelist.json';

const { filterInvoiceListBegin, filterInvoiceListSuccess, filterInvoiceListErr } = actions;

const invoicelistFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterInvoiceListBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterInvoiceListSuccess(data));
    } catch (err) {
      dispatch(filterInvoiceListErr(err));
    }
  };
};

export { invoicelistFilter };
