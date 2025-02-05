import actions from './actions';
import initialState from '../../demoData/subscriptions.json';

const { filterSubscriptionBegin, filterSubscriptionSuccess, filterSubscriptionErr } = actions;

const subscriptionFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterSubscriptionBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterSubscriptionSuccess(data));
    } catch (err) {
      dispatch(filterSubscriptionErr(err));
    }
  };
};

export { subscriptionFilter };
