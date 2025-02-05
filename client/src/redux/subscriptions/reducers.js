import actions from './actions';
import staticData from '../../demoData/subscriptions.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_SUBSCRIPTION_BEGIN, FILTER_SUBSCRIPTION_SUCCESS, FILTER_SUBSCRIPTION_ERR } = actions;

const subscriptionsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_SUBSCRIPTION_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_SUBSCRIPTION_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_SUBSCRIPTION_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default subscriptionsReducer;
