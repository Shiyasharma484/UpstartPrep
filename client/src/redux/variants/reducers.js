import actions from './actions';
import staticData from '../../demoData/variants.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_VARIANTSLIST_BEGIN, FILTER_VARIANTSLIST_SUCCESS, FILTER_VARIANTSLIST_ERR } = actions;

const variantslistReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_VARIANTSLIST_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_VARIANTSLIST_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_VARIANTSLIST_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default variantslistReducer;
