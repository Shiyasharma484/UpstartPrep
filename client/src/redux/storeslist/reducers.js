import actions from './actions';
import staticData from '../../demoData/storeslist.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_STORESLIST_BEGIN, FILTER_STORESLIST_SUCCESS, FILTER_STORESLIST_ERR } = actions;

const storeslistReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_STORESLIST_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_STORESLIST_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_STORESLIST_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default storeslistReducer;
