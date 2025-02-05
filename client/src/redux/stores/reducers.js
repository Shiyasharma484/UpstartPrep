import actions from './actions';
import staticData from '../../demoData/stores.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_STORE_BEGIN, FILTER_STORE_SUCCESS, FILTER_STORE_ERR } = actions;

const storesReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_STORE_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_STORE_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_STORE_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default storesReducer;
