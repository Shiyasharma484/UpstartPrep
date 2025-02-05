import actions from './actions';
import staticData from '../../demoData/moduleslist.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_MODULESLIST_BEGIN, FILTER_MODULESLIST_SUCCESS, FILTER_MODULESLIST_ERR } = actions;

const moduleslistReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_MODULESLIST_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_MODULESLIST_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_MODULESLIST_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default moduleslistReducer;
