import actions from './actions';
import staticData from '../../demoData/productlist.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_PRODUCTLIST_BEGIN, FILTER_PRODUCTLIST_SUCCESS, FILTER_PRODUCTLIST_ERR } = actions;

const productlistReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_PRODUCTLIST_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_PRODUCTLIST_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_PRODUCTLIST_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default productlistReducer;
