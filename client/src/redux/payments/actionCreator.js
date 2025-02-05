import actions from './actions';
import initialState from '../../demoData/payments.json';

const { filterPaymentBegin, filterPaymentSuccess, filterPaymentErr } = actions;

const paymentFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterPaymentBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterPaymentSuccess(data));
    } catch (err) {
      dispatch(filterPaymentErr(err));
    }
  };
};

export { paymentFilter };
