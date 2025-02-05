import actions from './actions';
import staticData from '../../demoData/storeuserslist.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_STOREUSERSLIST_BEGIN, FILTER_STOREUSERSLIST_SUCCESS, FILTER_STOREUSERSLIST_ERR } = actions;

const storeuserslistReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_STOREUSERSLIST_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_STOREUSERSLIST_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_STOREUSERSLIST_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default storeuserslistReducer;
