import actions from './actions';
import staticData from '../../demoData/transactions.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_TRANSACTION_BEGIN, FILTER_TRANSACTION_SUCCESS, FILTER_TRANSACTION_ERR } = actions;

const transactionsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_TRANSACTION_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_TRANSACTION_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_TRANSACTION_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default transactionsReducer;
