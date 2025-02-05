import actions from './actions';
import staticData from '../../demoData/customerslist.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_CUSTOMERSLIST_BEGIN, FILTER_CUSTOMERSLIST_SUCCESS, FILTER_CUSTOMERSLIST_ERR } = actions;

const customerslistReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_CUSTOMERSLIST_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_CUSTOMERSLIST_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_CUSTOMERSLIST_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default customerslistReducer;
