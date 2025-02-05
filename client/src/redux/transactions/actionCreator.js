import actions from './actions';
import initialState from '../../demoData/transactions.json';

const { filterTransactionBegin, filterTransactionSuccess, filterTransactionErr } = actions;

const transactionFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterTransactionBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterTransactionSuccess(data));
    } catch (err) {
      dispatch(filterTransactionErr(err));
    }
  };
};

export { transactionFilter };
