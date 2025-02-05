import actions from './actions';
import staticData from '../../demoData/payments.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_PAYMENT_BEGIN, FILTER_PAYMENT_SUCCESS, FILTER_PAYMENT_ERR } = actions;

const paymentsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_PAYMENT_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_PAYMENT_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_PAYMENT_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default paymentsReducer;
