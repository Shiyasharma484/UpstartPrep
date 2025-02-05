import actions from './actions';
import staticData from '../../demoData/categories.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_CATEGORY_BEGIN, FILTER_CATEGORY_SUCCESS, FILTER_CATEGORY_ERR } = actions;

const categoryReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_CATEGORY_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_CATEGORY_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_CATEGORY_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
