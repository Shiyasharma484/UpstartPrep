import actions from './actions';
import staticData from '../../demoData/productinventory.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_PRODUCTINVENTORY_BEGIN, FILTER_PRODUCTINVENTORY_SUCCESS, FILTER_PRODUCTINVENTORY_ERR } = actions;

const productinventoryReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_PRODUCTINVENTORY_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_PRODUCTINVENTORY_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_PRODUCTINVENTORY_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default productinventoryReducer;
