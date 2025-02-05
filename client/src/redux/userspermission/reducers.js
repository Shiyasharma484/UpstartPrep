import actions from './actions';
import staticData from '../../demoData/userspermission.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_USERSPERMISSION_BEGIN, FILTER_USERSPERMISSION_SUCCESS, FILTER_USERSPERMISSION_ERR } = actions;

const userspermissionReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_USERSPERMISSION_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_USERSPERMISSION_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_USERSPERMISSION_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default userspermissionReducer;
