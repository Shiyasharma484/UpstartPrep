import actions from './actions';
import staticData from '../../demoData/invoicelist.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_INVOICELIST_BEGIN, FILTER_INVOICELIST_SUCCESS, FILTER_INVOICELIST_ERR } = actions;

const invoicelistReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_INVOICELIST_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_INVOICELIST_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_INVOICELIST_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default invoicelistReducer;
